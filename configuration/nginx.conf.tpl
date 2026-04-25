events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name codehub.localhost.com;
        
        proxy_set_header Host $$host;
        proxy_set_header X-Real-IP $$remote_addr;
        proxy_set_header X-Forwarded-For $$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $$scheme;
        proxy_set_header X-Scheme $$scheme;

        location = /auth {
            return 301 /auth/;
        }

        location = /challenges {
            return 301 /challenges/;
        }

        location = /onboarding {
            return 301 /onboarding/;
        }

        location = /profile {
            return 301 /profile/;
        }

        location = /roadmaps {
            return 301 /roadmaps/;
        }
        
        location / {
            proxy_pass http://localhost:${FRONTEND_PUBLIC_PORT};

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

	    location /auth/ {
    	    proxy_pass http://localhost:${FRONTEND_AUTH_PORT};

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
	    }

        location /challenges/ {
            proxy_pass http://localhost:${FRONTEND_CHALLENGES_PORT};

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /onboarding/ {
            proxy_pass http://localhost:${FRONTEND_ONBOARDING_PORT};

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /profile/ {
            proxy_pass http://localhost:${FRONTEND_PROFILE_PORT};

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /roadmaps/ {
            proxy_pass http://localhost:${FRONTEND_ROADMAPS_PORT};

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /api/auth/ {
            proxy_pass http://localhost:${BACKEND_AUTH_PORT};
        }

        location /api/onboarding/ {
            proxy_pass http://localhost:${BACKEND_ONBOARDING_PORT};
        }

        location /api/public/ {
            proxy_pass http://localhost:${BACKEND_PUBLIC_PORT};
        }

        location /api/profile/ {
            proxy_pass http://localhost:${BACKEND_PROFILE_PORT};
        }

        location /api/roadmaps/ {
            proxy_pass http://localhost:${BACKEND_ROADMAPS_PORT};
        }

        location /api/challenges/ {
            proxy_pass http://localhost:${BACKEND_CHALLENGES_PORT};
        }
    }
}
