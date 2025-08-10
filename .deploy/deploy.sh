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

# Function to validate deployment YAML
validate_deployment_yaml() {
    echo "🔍 Validating deployment.yaml format..."
    if ! grep -q "image: ghcr.io/dannyyy/bmi_is/bmi-calculator" "$SCRIPT_DIR/deployment.yaml"; then
        echo "❌ Unexpected deployment.yaml format - missing expected image reference"
        exit 1
    fi
    echo "✅ Deployment YAML validation passed"
}

# Function to update image tags in deployment
update_image() {
    echo "🏷️  Updating image tag to $IMAGE_TAG..."
    local temp_file=$(mktemp)
    # Update the image tag regardless of current tag
    sed "s|image: ghcr.io/dannyyy/bmi_is/bmi-calculator:.*|image: ghcr.io/dannyyy/bmi_is/bmi-calculator:$IMAGE_TAG|g" "$SCRIPT_DIR/deployment.yaml" > "$temp_file"
    
    mv "$temp_file" "$SCRIPT_DIR/deployment.yaml.tmp"
}

# Function to force rolling restart for latest tag using kubectl patch
force_rolling_restart() {
    if [ "$IMAGE_TAG" = "latest" ]; then
        echo "🔄 Forcing rolling restart to pull latest image..."
        local timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)
        kubectl patch deployment bmi-calculator -n "$NAMESPACE" \
            -p "{\"spec\":{\"template\":{\"metadata\":{\"annotations\":{\"kubectl.kubernetes.io/restartedAt\":\"$timestamp\"}}}}}"
    fi
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
    
    echo "📦 Pods with Image Info:"
    kubectl get pods -l app=bmi-calculator -n "$NAMESPACE" -o custom-columns="NAME:.metadata.name,STATUS:.status.phase,IMAGE:.spec.containers[0].image,STARTED:.status.startTime"
    
    echo ""
    echo "🔍 Pod Image Digests (to verify latest images):"
    kubectl get pods -l app=bmi-calculator -n "$NAMESPACE" -o jsonpath='{range .items[*]}{"Pod: "}{.metadata.name}{"\n"}{"Image: "}{.spec.containers[0].image}{"\n"}{"ImageID: "}{.status.containerStatuses[0].imageID}{"\n\n"}{end}' 2>/dev/null || echo "Pods may still be starting..."
    
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
    
    # Validate deployment YAML format
    validate_deployment_yaml
    
    # Always update image tag in deployment
    update_image
    
    deploy_resources
    force_rolling_restart
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