# Infrastructure

Terraform for the `www` site on Google Cloud, all in `europe-west8` (Milan).

| Resource | Cost choice |
| --- | --- |
| Cloud Run | min 0 instances, request-based CPU, 128Mi, max 3 instances |
| Artifact Registry | keep the 10 newest versions; delete the rest after 180 days |
| Cloud Build | push to `main` builds `apps/www/Dockerfile` and deploys; docs/k8s/terraform changes skip the build |

Cleanup: a `KEEP` policy always wins over `DELETE`, so the 10 newest versions
survive even when older than 6 months, and older versions beyond them are removed.

## Use

```sh
gcloud auth application-default login
terraform init && terraform apply
```

Before the trigger can be created, install the Cloud Build GitHub app on the repo
(Cloud Build > Triggers > Connect repository). The first `apply` serves a
placeholder image until the first build deploys the real one; Terraform ignores
the image afterwards so it never reverts a deploy.
