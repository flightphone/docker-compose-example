#!/bin/bash
psql -d pomanager -U postgres -f /docker-entrypoint-initdb.d/pomanager.sq -w