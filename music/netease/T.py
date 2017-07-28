import sys

from PyQt5.QtCore import QUrl
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent
from PyQt5.QtWidgets import QApplication

app = QApplication(sys.argv)
# w = components.PlayBar()
# w = MyWidget.ProcessBar()
# w.show()
player = QMediaPlayer()
player.setMedia(QMediaContent(QUrl.fromLocalFile("http://m10.music.126.net/20170728134637/4626c99cf08ce937cf64871fc6b33b77/ymusic/6e01/a4d4/bbef/2dda07904eb54d44abb278165e1c6ead.mp3")))
player.play()

sys.exit(app.exec_())