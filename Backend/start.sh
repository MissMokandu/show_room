#!/bin/bash
set -o errexit

# Set Flask app
export FLASK_APP=app

# Run database migrations
flask db upgrade

# Start Gunicorn (production server)
exec gunicorn -w 4 -b 0.0.0.0:$PORT app:app
