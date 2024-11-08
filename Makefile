# Makefile

# Define the files to be encrypted/decrypted
SECRET_FILES := .env.local .env  # List of files to be encrypted/decrypted
ENCRYPTED_FILES := $(SECRET_FILES:%=%.gpg)  # Generate a list of encrypted file names by appending .gpg to each file in SECRET_FILES

# Encrypt all specified files
encrypt: $(ENCRYPTED_FILES)  # The encrypt target depends on all encrypted files

# Pattern rule to encrypt each file in SECRET_FILES
$(ENCRYPTED_FILES): %.gpg: %
	@gpg --symmetric --cipher-algo AES256 $<  # Encrypt the file using gpg with AES256 cipher

# Decrypt all specified files
decrypt: $(SECRET_FILES)  # The decrypt target depends on all original files

# Pattern rule to decrypt each file in ENCRYPTED_FILES
$(SECRET_FILES): %: %.gpg
	@gpg --output $@ --decrypt $<  # Decrypt the file using gpg