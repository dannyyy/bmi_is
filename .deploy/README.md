# Kubernetes Deployment Guide

This guide explains how to deploy the BMI Calculator application to a Kubernetes cluster with Traefik ingress and automated CI/CD.

## Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured to access your cluster
- Traefik ingress controller installed
- Docker registry access (GitHub Container Registry)
- Let's Encrypt cert resolver configured in Traefik

## Architecture Overview

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Internet      │───▶│   Traefik    │───▶│   BMI App       │
│                 │    │   (HTTPS)    │    │   (2+ replicas) │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │                       │
                              ▼                       ▼
                    ┌──────────────┐    ┌─────────────────┐
                    │ Let's Encrypt│    │   ConfigMap     │
                    │ Certificates │    │   & HPA         │
                    └──────────────┘    └─────────────────┘
```

## Quick Start

### 1. Configuration

The application is configured for:
- **Namespace**: `bmi`
- **Domains**: `bmi.is` and `www.bmi.is`
- **TLS**: Let's Encrypt certificates via Traefik

### 2. Manual Deployment

Deploy all components:
```bash
# Create namespace
kubectl create namespace bmi

# Apply all manifests
kubectl apply -f .deploy/ -n bmi

# Verify deployment
kubectl get pods -l app=bmi-calculator -n bmi
kubectl get service bmi-calculator-service -n bmi
kubectl get ingressroute bmi-calculator-secure -n bmi
```

### 3. Automated Deployment (Recommended)

The GitHub Actions workflow automatically deploys on push to `main` branch.

Required GitHub Secrets:
- `KUBECONFIG`: Base64 encoded kubeconfig file

```bash
# Generate base64 encoded kubeconfig
cat ~/.kube/config | base64 -w 0
```

## Components

### Application Deployment
- **File**: `deployment.yaml`
- **Replicas**: 2 (minimum for HA)
- **Resources**: 128Mi-512Mi memory, 100m-500m CPU
- **Health Checks**: Liveness and readiness probes
- **Security**: Non-root user, security contexts

### Service
- **File**: `service.yaml`
- **Type**: ClusterIP
- **Port**: 80 → 3000

### Traefik IngressRoute
- **File**: `ingressroute.yaml`
- **Features**: HTTPS termination, security headers
- **Middleware**: HSTS, security headers
- **TLS**: Let's Encrypt certificates

### ConfigMap
- **File**: `configmap.yaml`
- **Purpose**: Environment configuration
- **Data**: App name, version, settings

### Horizontal Pod Autoscaler
- **File**: `hpa.yaml`
- **Scaling**: 2-10 replicas
- **Metrics**: CPU (70%), Memory (80%)
- **Behavior**: Controlled scale up/down

## Monitoring & Health Checks

### Health Endpoint
- **URL**: `/api/health`
- **Response**: JSON with app status, uptime, memory usage
- **Used by**: Kubernetes probes, monitoring systems

### Metrics
- Kubernetes built-in metrics via HPA
- Custom application metrics available at health endpoint
- Prometheus scraping annotations configured

## Security

### Pod Security
- Non-root user (UID: 1001)
- Read-only root filesystem where possible
- Dropped capabilities
- Security context enforcement

### Network Security
- ClusterIP service (internal only)
- Traefik handles external access
- Security headers middleware
- Content Security Policy

### Container Security
- Multi-stage build reduces attack surface
- Minimal base image (Node.js Alpine)
- No sensitive data in container
- Regular base image updates

## Production Considerations

### Scaling
- HPA automatically scales based on CPU/memory
- Manual scaling: `kubectl scale deployment bmi-calculator --replicas=5 -n bmi`
- Consider cluster autoscaler for node scaling

### Updates
- Rolling updates with zero downtime
- Health checks prevent bad deployments
- Rollback capability: `kubectl rollout undo deployment/bmi-calculator -n bmi`

### Backup & Recovery
- Stateless application - no data backup needed
- Container images stored in GitHub Container Registry
- Infrastructure as Code - all configs in Git

### Monitoring
- Kubernetes events: `kubectl get events -n bmi`
- Pod logs: `kubectl logs -l app=bmi-calculator -n bmi`
- Resource usage: `kubectl top pods -n bmi`

## Troubleshooting

### Common Issues

1. **Pod not starting**
   ```bash
   kubectl describe pod <pod-name> -n bmi
   kubectl logs <pod-name> -n bmi
   ```

2. **Service not accessible**
   ```bash
   kubectl get endpoints bmi-calculator-service -n bmi
   kubectl port-forward service/bmi-calculator-service 8080:80 -n bmi
   ```

3. **Ingress not working**
   ```bash
   kubectl describe ingressroute bmi-calculator-secure -n bmi
   kubectl logs -n traefik deployment/traefik
   ```

4. **Health check failing**
   ```bash
   kubectl exec -it <pod-name> -n bmi -- wget -qO- http://localhost:3000/api/health
   ```

### Debug Commands
```bash
# Check deployment status
kubectl rollout status deployment/bmi-calculator -n bmi

# View resource usage
kubectl top pods -l app=bmi-calculator -n bmi

# Check HPA status
kubectl get hpa bmi-calculator-hpa -n bmi

# View events
kubectl get events --sort-by=.metadata.creationTimestamp -n bmi

# Test connectivity
kubectl run debug --image=busybox --rm -it --restart=Never -- sh
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `APP_NAME` | `BMI Calculator` | Application name |
| `APP_VERSION` | `1.0.0` | Version identifier |

## Resource Requirements

### Minimum Cluster Requirements
- **Nodes**: 2+ (for HA)
- **CPU**: 1 core total
- **Memory**: 1GB total
- **Storage**: 10GB (for system + images)

### Per Pod Requirements
- **CPU Request**: 100m
- **CPU Limit**: 500m
- **Memory Request**: 128Mi
- **Memory Limit**: 512Mi

## CI/CD Pipeline

### Workflow Stages
1. **Test**: Build and validate application
2. **Build**: Create and push Docker image
3. **Deploy**: Update Kubernetes resources
4. **Verify**: Run health checks
5. **Cleanup**: Remove old images

### Security
- Uses GitHub Container Registry
- OIDC token authentication
- No long-lived credentials
- Environment protection rules

## Maintenance

### Updates
- Application updates: Push to `main` branch
- Kubernetes updates: Manual cluster maintenance
- Base image updates: Rebuild container images

### Monitoring
- Set up alerts for pod failures
- Monitor resource usage trends
- Track deployment frequency and success rate

### Backup Strategy
- Git repository contains all configuration
- Container images in registry
- No persistent data to backup