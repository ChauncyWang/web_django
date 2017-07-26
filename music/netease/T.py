import sys
from PyQt5.QtWidgets import QApplication, QWidget

from music.netease import web_api

web_api.search_song("我的前半生", 0)


from music.netease import web_api
from music.ui.untitled import Ui_Form

app = QApplication(sys.argv)

w = QWidget()
Ui_Form().setupUi(w)
w.show()

sys.exit(app.exec_())
