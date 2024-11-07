# Makefile

# Define the file to be encrypted/decrypted
ENV_FILE=.env.local
ENCRYPTED_FILE=$(ENV_FILE).gpg

# Encrypt the .env.local file
encrypt: 
	@gpg --symmetric --cipher-algo AES256 $(ENV_FILE)

# Decrypt the .env.local.gpg file
decrypt: 
	@gpg --output $(ENV_FILE) --decrypt $(ENCRYPTED_FILE)