#!/bin/bash

# BMI Calculator Kubernetes Deployment Script
# Usage: ./deploy.sh [namespace] [image-tag]

set -e

NAMESPACE=${1:-bmi}
IMAGE_TAG=${2:-latest}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Deploying BMI Calculator to Kubernetes"
echo "📦 Namespace: $NAMESPACE"
echo "🏷️  Image Tag: $IMAGE_TAG"
echo ""

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl not found. Please install kubectl first."
        exit 1
    fi
}

# Function to check cluster connectivity
check_cluster() {
    echo "🔍 Checking cluster connectivity..."
    if ! kubectl cluster-info &> /dev/null; then
        echo "❌ Cannot connect to Kubernetes cluster. Please check your kubeconfig."
        exit 1
    fi
    echo "✅ Cluster connection successful"
}

# Function to create namespace if it doesn't exist
ensure_namespace() {
    echo "🔧 Creating namespace if it doesn't exist..."
    kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
    echo "✅ Namespace $NAMESPACE ready"
}

# Function to update image tags in deployment
update_image() {
    echo "🏷️  Updating image tag to $IMAGE_TAG..."
    local temp_file=$(mktemp)
    sed "s|image: bmi-calculator:latest|image: ghcr.io/dannyyy/bmi_is/bmi-calculator:$IMAGE_TAG|g" "$SCRIPT_DIR/deployment.yaml" > "$temp_file"
    mv "$temp_file" "$SCRIPT_DIR/deployment.yaml.tmp"
}

# Function to deploy resources
deploy_resources() {
    echo "📋 Deploying ConfigMap..."
    kubectl apply -f "$SCRIPT_DIR/configmap.yaml" -n "$NAMESPACE"
    
    echo "🌐 Deploying Service..."
    kubectl apply -f "$SCRIPT_DIR/service.yaml" -n "$NAMESPACE"
    
    echo "📈 Deploying HPA..."
    kubectl apply -f "$SCRIPT_DIR/hpa.yaml" -n "$NAMESPACE"
    
    echo "🚀 Deploying Application..."
    if [ -f "$SCRIPT_DIR/deployment.yaml.tmp" ]; then
        kubectl apply -f "$SCRIPT_DIR/deployment.yaml.tmp" -n "$NAMESPACE"
        rm "$SCRIPT_DIR/deployment.yaml.tmp"
    else
        kubectl apply -f "$SCRIPT_DIR/deployment.yaml" -n "$NAMESPACE"
    fi
    
    echo "🌍 Deploying Ingress Route..."
    kubectl apply -f "$SCRIPT_DIR/ingressroute.yaml" -n "$NAMESPACE"
}

# Function to wait for deployment
wait_for_deployment() {
    echo "⏳ Waiting for deployment to be ready..."
    kubectl rollout status deployment/bmi-calculator -n "$NAMESPACE" --timeout=300s
    echo "✅ Deployment ready"
}

# Function to verify deployment
verify_deployment() {
    echo "🔍 Verifying deployment..."
    
    echo "📦 Pods:"
    kubectl get pods -l app=bmi-calculator -n "$NAMESPACE"
    
    echo ""
    echo "🌐 Service:"
    kubectl get service bmi-calculator-service -n "$NAMESPACE"
    
    echo ""
    echo "🌍 Ingress Route:"
    kubectl get ingressroute bmi-calculator-secure -n "$NAMESPACE" 2>/dev/null || echo "IngressRoute not found or not accessible"
    
    echo ""
    echo "📈 HPA:"
    kubectl get hpa bmi-calculator-hpa -n "$NAMESPACE"
}

# Function to run health check
health_check() {
    echo "🩺 Running health check..."
    
    # Get service cluster IP
    SERVICE_IP=$(kubectl get service bmi-calculator-service -n "$NAMESPACE" -o jsonpath='{.spec.clusterIP}')
    
    if [ -n "$SERVICE_IP" ]; then
        echo "🔗 Service IP: $SERVICE_IP"
        
        # Run health check pod
        kubectl run health-check-$(date +%s) \
            --image=curlimages/curl \
            --rm -i --restart=Never \
            --timeout=30s \
            -n "$NAMESPACE" \
            -- curl -f -s "http://$SERVICE_IP/api/health" || {
            echo "⚠️  Health check failed - this might be normal if the app is still starting"
        }
    else
        echo "⚠️  Could not get service IP for health check"
    fi
}

# Main execution
main() {
    check_kubectl
    check_cluster
    ensure_namespace
    
    if [ "$IMAGE_TAG" != "latest" ]; then
        update_image
    fi
    
    deploy_resources
    wait_for_deployment
    verify_deployment
    health_check
    
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update the domain in ingressroute.yaml if needed"
    echo "   2. Verify the application is accessible through your domain"
    echo "   3. Set up monitoring and alerting"
    echo ""
    echo "🔍 Useful commands:"
    echo "   kubectl logs -l app=bmi-calculator -n $NAMESPACE"
    echo "   kubectl get pods -l app=bmi-calculator -n $NAMESPACE"
    echo "   kubectl port-forward service/bmi-calculator-service 8080:80 -n $NAMESPACE"
}

# Execute main function
main "$@"