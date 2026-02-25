-- Script para hacer el campo whatsapp nullable en la tabla agencies
-- Ejecutar este script en la base de datos PostgreSQL

ALTER TABLE agencies 
ALTER COLUMN whatsapp DROP NOT NULL;
