# Bernardo Forcillo's Personal website

The repository contains the source code of the Bernardo Forcillo's personal website. The project use as react framework nextjs, and as css stylesheet tailwindcss. It is deployed as a container on a kubernetes cluser.


## How to build and run the container 

```bash
podman build -t bernardoforcillo/bernardoforcillo-com:dev -f=apps/www/Dockerfile .
```

```bash
podman run  --rm -it -p 3080:3080 --network=host localhost/bernardoforcillo/bernardoforcillo-com:dev
```

## License

This project is licensed under the GNU Affero General Public license. See the license.md file for more details.
