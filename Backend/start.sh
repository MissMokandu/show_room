#!/bin/bash
# Run database migrations
flask db upgrade

# Start Gunicorn server
exec gunicorn app:app --bind 0.0.0.0:$PORT --workers 3
