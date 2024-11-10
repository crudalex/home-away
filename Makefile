# Makefile

# Define the files to be encrypted/decrypted
SECRET_FILES := .env.local .env  # List of files to be encrypted/decrypted
ENCRYPTED_FILES := $(SECRET_FILES:%=%.gpg)  # Generate a list of encrypted file names by appending .gpg to each file in SECRET_FILES

# Save password to a temporary file
PASS_FILE := /tmp/gpg_pass_d9ce48c8-9da8-11ef-b3bd-030169e052d9

# Pattern rule to encrypt each file in SECRET_FILES
# A Pattern Rule in Makefiles is a rule 
# that specifies a general pattern 
# for transforming one type of file into another. 
# $(ENCRYPTED_FILES): %.gpg: %
# 	@gpg --symmetric --cipher-algo AES256 $<  # Encrypt the file using gpg with AES256 cipher

# Encrypt all specified files
encrypt:
	@read -s -p "Enter encryption password: " PASS && echo "$$PASS" > $(PASS_FILE) && echo
	@for file in $(SECRET_FILES); do \
		gpg --batch --yes --passphrase-file $(PASS_FILE) --symmetric --cipher-algo AES256 $$file; \
	done
	@rm $(PASS_FILE)

# Decrypt all specified files
decrypt:
	@read -s -p "Enter decryption password: " PASS && echo "$$PASS" > $(PASS_FILE) && echo
	@for file in $(ENCRYPTED_FILES); do \
		gpg --batch --yes --passphrase-file $(PASS_FILE) --output $${file%.gpg} --decrypt $$file; \
	done
	@rm $(PASS_FILE)

# Run Prisma migrations

# migration is set of operations
# that modify the database schema
# helping it evolve over time 
# while preserving existing data

# creates a new migration 'init' 
# for your database schema changes
# and applies it
migrate: 
	@npx prisma migrate dev --name init  

# directly updates the database schema 
# without creating a migration
db_push: 
	@npx prisma db push  

# Open Prisma Studio
prisma_studio:
	@npx prisma studio

PHONY: encrypt decrypt migrate db_push prisma_studio