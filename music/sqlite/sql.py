import sqlite3

conn = sqlite3.connect("music.sqlite3")
conn.execute('''CREATE TABLE song (
id PRIMARY KEY ,
name VARCHAR(20) NOT NULL 

)''')
conn.close()