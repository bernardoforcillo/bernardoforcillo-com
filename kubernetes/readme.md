# Kubernetes deployment configurations


```bash
kubectl port-forward -n kube-system $(kubectl -n kube-system get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
```