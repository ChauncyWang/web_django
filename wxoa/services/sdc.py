from Crypto.Cipher import AES


key = '0123456789abcdef'
mode = AES.MODE_CBC
encryptor = AES.new(key, mode)
text = 'j' * 64 + 'i' * 128
ciphertext = encryptor.encrypt(text)
