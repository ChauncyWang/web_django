import sys
from PyQt5.QtWidgets import *
from music.ui.music import Ui_Form

app = QApplication(sys.argv)

w = QWidget()
Ui_Form().setupUi(w)
w.show()

sys.exit(app.exec_())
