!function (e) {
    function t(r) {
        if (n[r])return n[r].exports;
        var o = n[r] = {exports: {}, id: r, loaded: !1};
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, exports, t) {
    var n = t(1), r = t(2), o = t(3), i = t(5), a = (t(7), t(4)), $ = t(8), s = t(6), l = t(9), c = {
        isPageBottom: function () {
            var e = $(document).scrollTop(), t = $(document).height(), n = $(window).height();
            return e + n > t - 200
        }, init: function () {
            var e = this, t = $(".search_input input"), o = $(".top_search .search_input input"),
                i = $(".content_search .search_input input"), s = $(".top_search_recommend"),
                l = $(".content_search_recommend"), c = n.QueryString("searchType") || "song",
                h = n.QueryString("searchKeyWord") || t.val();
            r.init(), e.nofouce(function (e) {
                "{}" != n.JSON.stringify(e) && "undefined" != typeof e && "" != e && 0 != e.length && "undefined" != e[0] && "undefined" != e[0].keyword && (n.hasPlaceholder() ? (o.attr("placeholder", e[0].keyword), i.attr("placeholder", e[0].keyword)) : (o.val(e[0].keyword), i.val(e[0].keyword))), h ? (a.defaultKey = !0, t.val(decodeURIComponent(h)), a.searchKeyWord = decodeURIComponent(h), setTimeout(function () {
                    l.removeClass("show").addClass("hide").hide(), s.removeClass("show").addClass("hide").hide()
                }, 200)) : a.searchKeyWord = i.attr("placeholder"), r.showActive(c)
            }), e.bindUI()
        }, bindUI: function () {
            var e = this, t = $(".content_search .searh_btn"), s = $(".top_search_histroy"),
                l = $(".top_search_recommend"), c = $(".content_search_histroy"), h = $(".content_search_recommend"),
                d = document.getElementById("search_song"),
                u = (document.getElementById("search_special"), $(".top_search .search_input input")),
                f = $(".content_search .search_input input"), g = null, m = null, p = 1, v = 2, y = location.href,
                _ = document.referrer, w = "http://download.kugou.com/download/kugou_pc";
            try {
                y.indexOf("baidu") != -1 || _.indexOf("baidu.com") != -1 ? w = "http://xiazai.kugou.com/Corp/kugou7_3762.exe" : y.indexOf("sogou") == -1 && _.indexOf("sogou") == -1 || (w = "http://xiazai.kugou.com/Corp/kugou7_3814.exe")
            } catch (e) {
            }
            $("#downlaod a").attr("href", w), $(".search_tab li").on("click", function (e) {
                return $(this).addClass("active").siblings("li").removeClass("active"), a.fo = "搜索页", a.searchType = $(this).attr("data-type"), r.showActive(a.searchType), !1
            }), c.on("click", ".clear_histroy", function () {
                localStorage.s_keyword = "", c.find(".history_song_list").empty(), c.removeClass("show").addClass("hide")
            }), t.on("click", function () {
                $(this).parent().parent().hasClass("content_search") ? a.fo = "搜索页" : a.fo = "头部导航栏", a.searchKeyWord = f.val(), "" == a.searchKeyWord && (a.searchKeyWord = f.attr("placeholder")), u.val(a.searchKeyWord), r.resetSearchSetting(function () {
                    a.searchType = "song", r.showActive("song")
                })
            }), f.on("keydown", function (e) {
                var t = $(".content_search_histroy dd"), n = $(".content_search_recommend dl.recommend_song_list dd"),
                    o = $(".content_search_recommend dl.recommend_mv_list dd"),
                    i = $(".content_search_histroy dd.hover").index(),
                    s = $(".content_search_recommend .recommend_song_list dd.hover").index(),
                    l = $(".content_search_recommend .recommend_mv_list dd.hover").index();
                13 === e.keyCode ? (a.fo = "搜索页", a.searchKeyWord = f.val(), u.val(a.searchKeyWord), r.resetSearchSetting(function () {
                    r.showActive("song")
                }), c.removeClass("show").addClass("hide"), h.removeClass("show").addClass("hide")) : 38 == e.keyCode ? (v = s != -1 ? 1 : 2, c.hasClass("show") ? i + 1 == 0 ? t.eq(t.length - 1).addClass("hover").siblings("dd").removeClass("hover") : t.eq(i - 1).addClass("hover").siblings("dd").removeClass("hover") : h.hasClass("show") && (0 == o.length && 0 != n.length && (v = 1, s + 1 == 0 ? (v = 1, n.removeClass("hover"), n.eq(n.length - 1).addClass("hover")) : (v = 1, n.removeClass("hover"), n.eq(s - 1).addClass("hover"))), 0 == n.length && 0 != o.length && (v = 2, l + 1 == 0 ? (n.removeClass("hover"), o.eq(o.length - 1).addClass("hover")) : (o.removeClass("hover"), o.eq(l - 1).addClass("hover"))), 0 != n.length && 0 != o.length && (1 == v ? 0 == s ? (v = 2, n.removeClass("hover"), o.eq(o.length - 1).addClass("hover")) : (n.removeClass("hover"), n.eq(s - 1).addClass("hover")) : l + 1 == 0 ? (n.removeClass("hover"), o.eq(o.length - 1).addClass("hover")) : 0 == l ? (v = 1, o.removeClass("hover"), n.eq(n.length - 1).addClass("hover")) : (o.removeClass("hover"), o.eq(l - 1).addClass("hover")))), c.hasClass("show") ? f.val($(".search_histroy dd.hover").attr("title")) : h.hasClass("show") && (1 == v ? f.val($(".content_search_recommend .recommend_song_list dd.hover").attr("title")).attr("data", "song") : f.val($(".content_search_recommend .recommend_mv_list dd.hover").attr("title")).attr("data", "mv"))) : 40 == e.keyCode && (c.hasClass("show") ? i + 1 == t.length ? t.eq(0).addClass("hover").siblings("dd").removeClass("hover") : t.eq(i + 1).addClass("hover").siblings("dd").removeClass("hover") : h.hasClass("show") && (0 == o.length && 0 != n.length && (p = 1, s + 1 == n.length ? (n.removeClass("hover"), n.eq(0).addClass("hover")) : (n.removeClass("hover"), n.eq(s + 1).addClass("hover"))), 0 == n.length && 0 != o.length && (p = 2, l + 1 == n.length ? (o.removeClass("hover"), o.eq(0).addClass("hover")) : (o.removeClass("hover"), o.eq(l + 1).addClass("hover"))), 0 != n.length && 0 != o.length && (1 == p ? s + 1 == 0 ? (o.removeClass("hover"), n.eq(0).addClass("hover")) : s + 1 == n.length ? (p = 2, n.removeClass("hover"), o.eq(0).addClass("hover")) : (n.removeClass("hover"), n.eq(s + 1).addClass("hover")) : l + 1 == o.length ? (p = 1, o.removeClass("hover"), n.eq(0).addClass("hover")) : (o.removeClass("hover"), o.eq(l + 1).addClass("hover")))), c.hasClass("show") ? f.val($(".search_histroy dd.hover").attr("title")) : h.hasClass("show") && (1 == p ? f.val($(".content_search_recommend .recommend_song_list dd.hover").attr("title")).attr("data", "song") : f.val($(".content_search_recommend .recommend_mv_list dd.hover").attr("title")).attr("data", "mv")))
            }).on("click", function () {
                a.defaultKey = !1, l.fadeOut(100).addClass("hide").removeClass("show"), s.fadeOut(100).addClass("hide").removeClass("show"), h.fadeOut(100).addClass("hide").removeClass("show"), c.fadeOut(100).addClass("hide").removeClass("show"), "" == f.val() ? r.historyHtml(function (e) {
                    "" != e ? c.html(e).fadeIn(100).addClass("show").removeClass("hide") : c.addClass("noData")
                }) : (clearTimeout(m), m = setTimeout(function () {
                    r.wordRecommend({
                        keyword: f.val(), callback: function (e) {
                            "" != e ? h.html(e).fadeIn(100).addClass("show").removeClass("hide") : c.fadeOut(100).addClass("hide").removeClass("show")
                        }
                    })
                }, 10))
            }).on("textchange", function () {
                a.defaultKey || ("" != f.val() ? (c.fadeOut(100).addClass("hide").removeClass("show"), clearTimeout(m), m = setTimeout(function () {
                    r.wordRecommend({
                        keyword: f.val(), callback: function (e) {
                            "" != e ? h.html(e).fadeIn(100).addClass("show").removeClass("hide") : c.fadeOut(100).addClass("hide").removeClass("show")
                        }
                    })
                }, 10)) : (h.fadeOut(100).addClass("hide").removeClass("show"), r.historyHtml(function (e) {
                    "" != e ? c.html(e).fadeIn(100).addClass("show").removeClass("hide") : c.addClass("noData")
                })))
            }).on("blur", function () {
                g = setTimeout(function () {
                    c.hasClass("noData") || c.fadeOut(100).addClass("hide").removeClass("show"), h.fadeOut(100).addClass("hide").removeClass("show")
                }, 400)
            }), c.mouseover(function () {
                clearTimeout(g), c.removeClass("hide").addClass("show")
            }), c.on("click", "dd", function () {
                a.fo = "搜索页";
                var e = $(this);
                return f.val(n.SIPHtmlDecode(e.attr("title"))), u.val(n.SIPHtmlDecode(e.attr("title"))), r.resetSearchSetting(function () {
                    a.searchType = "song", a.searchKeyWord = n.SIPHtmlDecode(e.attr("title")), r.showActive(a.searchType)
                }), c.removeClass("show").addClass("hide"), !1
            }), h.on("click", "dd", function () {
                a.fo = "搜索页";
                var e = $(this), t = n.SIPHtmlDecode(e.attr("title"));
                return f.val(t), u.val(t), n.keywordStorge(t), r.resetSearchSetting(function () {
                    a.searchType = e.attr("data-type"), a.searchKeyWord = t, r.showActive(a.searchType)
                }), c.removeClass("show").addClass("hide"), !1
            }), $("#search_song li").on("click", ".checkall", function () {
                $(this).hasClass("checked") ? ($(this).removeClass("checked"), $(d).find(".checkbox").removeClass("checked"), $(d).find("li").removeClass("active")) : ($(this).addClass("checked"), $(d).find(".checkbox").addClass("checked"), $(d).find("li").addClass("active"))
            }), $(d).off("click").on("click", ".play_all", function () {
                var t = (o.datacache.searchSongData, []), r = [], i = $(d).find(".checked").not(".checkall");
                if ($(i).each(function (e) {
                        var n = $(this).closest("li").data("song");
                        t.push(n)
                    }), 0 != t.length && $(t).each(function (e, t) {
                        var o = {};
                        o.audio_name = n.delHtmlTag(t.SongName), o.author_name = n.delHtmlTag(t.SingerName), o.Hash = t.FileHash, o.album_id = t.AlbumID, o.timelength = 1e3 * t.Duration, o.from = "search", o.random = (new Date).getTime(), r.push(o)
                    }), 0 != r.length) {
                    var a = JSON.stringify(r);
                    if ("false" == e.isExists() || null === e.isExists()) {
                        $.jStorage.set("k_play_list", a), window.open("http://www.kugou.com/song/")
                    } else $.jStorage.set("newsong", a), timeForAccident = setTimeout(function () {
                        if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
                            $.jStorage.set("k_play_list", a), location.href = "http://www.kugou.com/song/"
                        }
                    }, 3e3);
                    e.addTips()
                } else {
                    var s = dialog({
                        title: "请选择歌曲",
                        skin: "download_popup",
                        content: ['<div class="dialogContent clearfix" id="forbidPlay">', '<div class="contetText">请选择歌曲</div>', '<div class="dialogFooter clearfix">', '<a class="btnDl" id="iKown">我知道了</a>', "</div>", "</div>"].join(""),
                        onshow: function () {
                            $(".btnDl").off("click").on("click", function (e) {
                                e.preventDefault(), $(".ui-dialog-close").trigger("click")
                            })
                        }
                    });
                    s.show()
                }
            }), $(d).on("click", ".icon_play", function () {
                var t = {}, r = [], o = $(this).closest("li").data("song");
                t.audio_name = n.delHtmlTag(o.SongName), t.author_name = n.delHtmlTag(o.SingerName), t.Hash = o.FileHash, t.album_id = o.AlbumID, t.timelength = 1e3 * o.Duration, t.from = "search", t.random = (new Date).getTime(), r.push(t);
                var i = JSON.stringify(r);
                if ("false" == e.isExists() || null === e.isExists()) {
                    $.jStorage.set("k_play_list", i), window.open("http://www.kugou.com/song/")
                } else $.jStorage.set("newsong", i), timeForAccident = setTimeout(function () {
                    if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
                        $.jStorage.set("k_play_list", i), location.href = "http://www.kugou.com/song/"
                    }
                }, 3e3);
                e.addTips()
            }), $(d).on("click", ".icon_download", function () {
                var t = {}, r = $(this).closest("li").data("song");
                t.audio_name = n.delHtmlTag(r.SingerName) + "-" + n.delHtmlTag(r.SongName), t.author_name = n.delHtmlTag(r.SingerName), t.Hash = r.FileHash, t.privilege = r.Privilege, t.album_id = r.AlbumID, t.FileSize = r.FileSize, t.timelength = 1e3 * r.Duration, e.download(t)
            }), $(d).on("click", ".icon_share", function () {
                var t = {}, r = $(this).closest("li").data("song");
                t.audio_name = n.delHtmlTag(r.SingerName) + "-" + n.delHtmlTag(r.SongName), t.author_name = n.delHtmlTag(r.SingerName), t.Hash = r.FileHash, t.album_id = r.AlbumID, t.timelength = 1e3 * r.Duration, e.share(t)
            }), $(d).on("click", ".song_name", function (t) {
                t.preventDefault();
                var r = {}, o = [], i = $(this).closest("li").data("song");
                r.audio_name = n.delHtmlTag(i.SingerName) + "-" + n.delHtmlTag(i.SongName), r.author_name = n.delHtmlTag(i.SingerName), r.Hash = i.FileHash, r.album_id = i.AlbumID, r.timelength = 1e3 * i.Duration, r.from = "search", r.random = (new Date).getTime(), o.push(r);
                var a = JSON.stringify(o);
                if ("false" == e.isExists() || null === e.isExists()) {
                    $.jStorage.set("k_play_list", a), window.open("http://www.kugou.com/song/")
                } else $.jStorage.set("newsong", a), timeForAccident = setTimeout(function () {
                    if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
                        $.jStorage.set("k_play_list", a), location.href = "http://www.kugou.com/song/"
                    }
                }, 3e3);
                return e.addTips(), !1
            }), $("#search_special").off("click").on("click", ".special_link", function (e) {
                e.preventDefault(), window.open($(this).attr("href"))
            }), $("#search_special li").on("mouseover", function (e) {
                $(".play-item").show()
            }).on("mouseout", function (e) {
                $(".play-item").show()
            }), $("#search_special").on("click", ".icon_play", function (t) {
                if (t.preventDefault(), t.stopPropagation(), t.target.className.indexOf("icon_play") != -1) {
                    var r = $(this).attr("data");
                    i.getSpecialSongs({collection_id: r}, function (t) {
                        if ("undefined" != typeof t && t.length > 0) {
                            for (var r = [], o = 0, i = t.length; o < i; o++) {
                                var a = {};
                                a.audio_name = n.delHtmlTag(t[o].audio_name), a.author_name = n.delHtmlTag(t[o].author_name), a.Hash = t[o].hash, a.album_id = t[o].album_id, a.timelength = t[o].timelength, a.from = "search", a.random = (new Date).getTime(), r.push(a)
                            }
                            var s = JSON.stringify(r);
                            "false" == e.isExists() || null === e.isExists() ? ($.jStorage.set("k_play_list", s), window.location = "http://www.kugou.com/song/") : ($.jStorage.set("newsong", s), timeForAccident = setTimeout(function () {
                                if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
                                    $.jStorage.set("k_play_list", s), location.href = "http://www.kugou.com/song/"
                                }
                            }, 3e3)), e.addTips()
                        } else {
                            var l = dialog({
                                title: "请选择歌曲",
                                skin: "download_popup",
                                content: ['<div class="dialogContent clearfix" id="forbidPlay">', '<div class="contetText">播放失败,请稍后重试</div>', '<div class="dialogFooter clearfix">', '<a class="btnDl" id="iKown">我知道了</a>', "</div>", "</div>"].join(""),
                                onshow: function () {
                                    $(".btnDl").off("click").on("click", function (e) {
                                        e.preventDefault(), $(".ui-dialog-close").trigger("click")
                                    })
                                }
                            });
                            l.show()
                        }
                    })
                }
            })
        }, nofouce: function (e) {
            $.ajax({
                type: "GET",
                url: "http://so.service.kugou.com/v1/word_nofocus?platform=pc",
                dataType: "jsonp",
                success: function (t) {
                    e(1 == t.status ? t.data : "")
                },
                error: function (t) {
                    e("")
                }
            })
        }, shared: null, downloadd: null, hashQueryShortUrl: function (e, t) {
            var r = this, o = n.delHtmlTag(e.author_name) + "-" + n.delHtmlTag(e.audio_name), i = e.Hash,
                a = e.album_id || 0, l = s.md5(i + "kgclientshare"), c = "weixin" == e.chl ? "webCode" : "", h = {
                    cmid: 1,
                    filename: o,
                    hash: i,
                    album_id: a,
                    is_short: 1,
                    md5: l,
                    chl: e.chl || "weixin",
                    codes: 1,
                    from: c
                };
            $.ajax({
                type: "get",
                url: "http://t.service.kugou.com/app/",
                timeout: 3e3,
                dataType: "jsonp",
                jsonp: "callback",
                data: h,
                success: function (e) {
                    e && (e.status ? ($(".qrcode").find("png").attr("src", e.codes_url), t && t(e)) : 31001 == e.err_code && (setTimeout(function () {
                            r.shareIsCanClick = !0
                        }, 1e3), $(".qrcode").find("png").attr("src", "http://www2.kugou.kugou.com/apps/kucodeAndShare/static/images/no_share.jpg"), t && t("")))
                },
                error: function (e, n) {
                    t && t("")
                }
            })
        }, download: function (e) {
            var t = this;
            t.downloadd || (t.downloadd = dialog({
                title: "下載歌曲",
                skin: "download_popup",
                fixed: !0,
                content: [' <div class="dialogContent clearfix">', '<div class="contetText">', '<p><span class="warn_icon"></span>下载歌曲需要在酷狗音乐客户端操作</p></div>', '<div class="dialogFooter clearfix">', "<a href=\"#\" class=\"callClient\" onclick=\"_hmt.push(['_trackEvent', 'hideopen', 'opencilick', 'hopenpc']);\">打开客户端</a>", "<a href=\"#\" class=\"btnDl\" onclick=\"_hmt.push(['_trackEvent', 'hidedownnew', 'newcilick', 'newpc']);\">下载新版客户端</a>", "</div>", " </div>"].join(""),
                onshow: function () {
                    $(".btnDl").off("click").on("click", function (e) {
                        e.preventDefault();
                        window.open("http://download.kugou.com/download/kugou_pc");
                        t.downloadd.close().remove()
                    }), $(".callClient").off("click").on("click", function (n) {
                        n.preventDefault(), t.callExe({song_info: e}), t.downloadd.close().remove()
                    })
                },
                onclose: function () {
                    t.downloadd = null
                }
            }), t.downloadd.show())
        }, share: function (e) {
            var t = this;
            t.shared || (t.shared = dialog({
                title: "分享歌曲",
                skin: "share_popup",
                fixed: !0,
                content: ["<div id='share_list'>", " <dl>", "<dt class='share_weixin'></dt>", "<dd class='qrcode'><png src='' /></dd>", "<dd>微信</dd>", "</dl>", "<dl>", "<dt class='share_friend'></dt>", "<dd>QQ好友</dd>", "</dl>", "<dl>", "<dt class='share_qzone'></dt>", "<dd>QQ空间</dd>", "</dl>", "<dl>", "<dt class='share_weibo'></dt>", "<dd>新浪微博</dd>", "</dl>", "</div>"].join(""),
                onshow: function () {
                    var r = n.delHtmlTag(e.author_name) + "-" + n.delHtmlTag(e.audio_name),
                        o = "我在酷狗常听的《" + r + "》，你也来听听吧！（来自 web 酷狗音乐）";
                    sharePic = "http://www.kugou.com/yy/static/images/share-cover.png", e.chl = "weixin", t.hashQueryShortUrl(e, function (e) {
                        var n = e.data;
                        $(".share_weixin").mouseover(function () {
                            $(".qrcode").show()
                        }).mouseout(function () {
                            $(".qrcode").hide()
                        }), "" != n && 31001 != e.err_code || t.upSupportShare("微信")
                    }), $.ajax({
                        type: "get",
                        url: "http://www.kugou.com/root/getSongCover?hash=" + e.Hash,
                        timeout: 3e3,
                        cache: !1,
                        success: function (e) {
                            1 == e.status && $.isArray(e.data) && e.data[0] && "" != e.data[0].sizable_cover && (sharePic = e.data[0].sizable_cover.replace(/{size}/, 135))
                        },
                        error: function (e, t) {
                        }
                    }), $(".share_friend").on("click", function () {
                        var n = window.open("");
                        e.chl = "qq", t.hashQueryShortUrl(e, function (e) {
                            var i = e.data;
                            "" == i || 31001 == e.err_code ? t.upSupportShare("QQ") : n.location = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(i) + "&desc=&title=" + encodeURIComponent(r) + "&summary=" + encodeURIComponent(o) + "&pics=" + sharePic + "&flash=&site=www.kugou.com", t.shared.close().remove()
                        })
                    }), $(".share_qzone").on("click", function () {
                        var n = window.open("");
                        e.chl = "qzone", t.hashQueryShortUrl(e, function (e) {
                            var i = e.data;
                            "" == i || 31001 == e.err_code ? t.upSupportShare("QQ空间") : n.location = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(i) + "&title=" + r + "&pics=" + sharePic + "&summary=" + o
                        }), t.shared.close().remove()
                    }), $(".share_weibo").on("click", function () {
                        var n;
                        n = o.replace("#", "%23"), n = n.replace("（来自 PC 酷狗音乐）", "（ 来自 @酷狗音乐 web版 ）"), n = encodeURIComponent(n);
                        var r = window.open("");
                        e.chl = "weibo", t.hashQueryShortUrl(e, function (e) {
                            var o = e.data;
                            "" == o || 31001 == e.err_code ? t.upSupportShare("微博") : r.location = "http://v.t.sina.com.cn/share/share.php?appkey=340086183&pic=" + sharePic + "&url=" + encodeURIComponent(o) + "&title=" + n
                        }), t.shared.close().remove()
                    })
                },
                onclose: function () {
                    t.shared = null
                }
            }), t.shared.show())
        }, upSupportShare: function (e) {
            var t = dialog({
                width: 200,
                height: 50,
                title: "不支持分享",
                skin: "unshare",
                content: "该歌曲不支持" + e + "分享"
            }).show();
            setTimeout(function () {
                t.close().remove()
            }, 2e3)
        }, callExe: function (e) {
            var t = this, r = e.song_info, o = n.delHtmlTag(r.author_name + "-" + r.audio_name),
                i = o.length > 58 ? o.substring(0, 58) + "..." : o,
                a = '{"Files":[{"filename":"' + i + '.mp3","hash":"' + r.Hash + '","size":"' + r.FileSize + '","duration":"' + 1e3 * r.timelength + '","bitrate":"128","isfilehead":"100","privilege":"' + r.privilege + '","album_id":"' + r.album_id + '"}]}',
                s = "kugou://download?p=" + l.Base64.encode(a);
            t.isIE(6) || t.isIE(7) || t.isIE(8) ? window.open(s) : $("body").append(" <iframe style='display:none' src='" + s + "'></iframe>")
        }, isIE: function (e) {
            var t = document.createElement("b");
            return t.innerHTML = "<!--[if IE " + e + "]><i></i><![endif]-->", 1 === t.getElementsByTagName("i").length
        }, isExists: function () {
            return $.jStorage.reInit(), $.jStorage.get("playFlag")
        }, addTips: function () {
            var e = ['<div class="playtips"><div class="relativeD">', '<div class="playtips_bg"></div>', '<png src="http://www.kugou.com/yy/static/images/play/icon_add.png" alt="" class="playtips_icon">', '<p class="tipstext">已添加至播放页</p>', "</div></div>"].join(""),
                t = $(".playtips");
            t.length > 0 ? t.show().animate({opacity: "1"}).show() : $("body").append(e);
            var n = setTimeout(function () {
                $(".playtips").hide().animate({opacity: "0"}).hide(), clearTimeout(n)
            }, 1e3)
        }
    };
    $(document).ready(function () {
        c.init()
    })
}, function (module, exports) {
    module.exports = {
        QueryString: function () {
            if (arg1 = arguments[0], arg2 = arguments[1], arguments.length > 1 && "" != arg1 && "" != arg2 && void 0 != arg1 && void 0 != arg2)var e = arguments[0].match(new RegExp("[?#&]" + arg2 + "=([^&|#]*)(&?)", "i")); else if ("" != arg1 && void 0 != arg1)var e = location.href.match(new RegExp("[?#&]" + arg1 + "=([^&|#]*)(&?)", "i"));
            return e ? e[1] : e
        }, getMS: function (e) {
            var t = e / 1e3, n = t, r = Math.floor(n / 60), o = Math.floor(n % 60), i = "";
            return i += r >= 10 ? r : "0" + r, i += ":", i += o >= 10 ? o : "0" + o
        }, detectOS: function () {
            var e = (navigator.userAgent, "Win32" == navigator.platform || "Windows" == navigator.platform || "Win64" == navigator.platform),
                t = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform;
            if (t)return "Mac";
            var n = "X11" == navigator.platform && !e && !t;
            if (n)return "Unix";
            var r = String(navigator.platform).indexOf("Linux") > -1;
            return r ? "Linux" : e ? "Windows" : "other"
        }, formatDateTime: function (e) {
            var t = e.getFullYear(), n = e.getMonth() + 1;
            n = n < 10 ? "0" + n : n;
            var r = e.getDate();
            r = r < 10 ? "0" + r : r;
            var o = e.getHours(), i = e.getMinutes(), a = e.getSeconds();
            return i = i < 10 ? "0" + i : i, a = a < 10 ? "0" + a : a, t + "-" + n + "-" + r + " " + o + ":" + i + ":" + a
        }, flashChecker: function () {
            var e = 0, t = 0;
            if (document.all) {
                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                n && (e = 1, VSwf = n.GetVariable("$version"), t = parseInt(VSwf.split(" ")[1].split(",")[0]))
            } else if (navigator.plugins && navigator.plugins.length > 0) {
                var n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    e = 1;
                    for (var r = n.description.split(" "), o = 0; o < r.length; ++o)isNaN(parseInt(r[o])) || (t = parseInt(r[o]))
                }
            }
            return {f: e, v: t}
        }, getBrowser: function () {
            var e, t = {}, n = navigator.userAgent.toLowerCase();
            return (e = n.match(/rv:([\d.]+)\) like gecko/)) ? t = {
                v: e[1],
                type: "ie"
            } : (e = n.match(/msie ([\d.]+)/)) ? t = {
                v: e[1],
                type: "ie"
            } : (e = n.match(/firefox\/([\d.]+)/)) ? t = {
                v: e[1],
                type: "firefox"
            } : (e = n.match(/chrome\/([\d.]+)/)) ? t = {
                v: e[1],
                type: "chrome"
            } : (e = n.match(/opera.([\d.]+)/)) ? t = {
                v: e[1],
                type: "opera"
            } : (e = n.match(/version\/([\d.]+).*safari/)) ? t = {v: e[1], type: "safari"} : 0, t
        }, keywordStorge: function (e) {
            var t, n, r, o = [], i = !1, a = 5;
            for ("" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (o = localStorage.s_keyword.split("|")), t = 0, n = o.length; t < n; t++)o[t] == e && (i = !0, r = t);
            i && o.splice(r, 1), o.length >= a && (o = o.slice(o.length - 4, o.length)), o.push(e), localStorage.s_keyword = o.join("|")
        }, delHtmlTag: function (e) {
            return e.replace(/<[^>]+>/g, "")
        }, insertArrayAt: function (e, t, n) {
            return Array.prototype.splice.apply(e, [t, 0].concat(n)), e
        }, removeDuplicates: function (e, t) {
            var n = [], r = {};
            for (var o in e)r[e[o][t]] = e[o];
            for (o in r)n.push(r[o]);
            return n
        }, isArray: function (e) {
            return "function" == typeof Array.isArray ? Array.isArray(e) : Object.prototype.toString.call(e)
        }, unique: function (e) {
            for (var t = [], n = {}, r = 0; r < e.length; r++)n[e[r]] || (n[e[r]] = !0, t.push(e[r]));
            return t
        }, setCookie: function (e, t, n) {
            var r = new Date;
            r.setDate(r.getDate() + n), document.cookie = e + "=" + escape(t) + (null == n ? "" : ";expires=" + r.toGMTString())
        }, getCookie: function (e) {
            return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), c_start != -1) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
        }, read: function (e, t) {
            var n = "", r = e + "=";
            document.cookie.split("").length > 0 && (offset = document.cookie.indexOf(r), offset != -1 && (offset += r.length, end = document.cookie.indexOf(";", offset), end == -1 && (end = document.cookie.split("").length), n = document.cookie.substring(offset, end)));
            for (var o = n.split("&"), i = {}, a = !1, s = 0, l = o.length; s < l; s++) {
                var c = o[s].split("=");
                "" != c[0] && (i[c[0]] = c[1], a = !0)
            }
            return !!a && i
        }, deleteCookie: function (e) {
            var t = new Date;
            t.setTime(t.getTime() - 1e4), document.cookie = e + "=v; expires =" + t.toGMTString()
        }, SIPHtmlDecode: function (e) {
            var t = "";
            return 0 == e.length || "undefined" == typeof e ? t : (t = e.replace(/&lt;/g, "<"), t = t.replace(/&#60;/g, "<"), t = t.replace(/&gt;/g, ">"), t = t.replace(/&#62;/g, ">"), t = t.replace(/&nbsp;/g, " "))
        }, hasPlaceholder: function () {
            var e = "placeholder", t = document.createElement("input");
            return e in t
        }, JSON: function () {
            function f(e) {
                return e < 10 ? "0" + e : e
            }

            function stringify(e, t) {
                var n, r, o, i, a, s = /["\\\x00-\x1f\x7f-\x9f]/g;
                switch (typeof e) {
                    case"string":
                        return s.test(e) ? '"' + e.replace(s, function (e) {
                                var t = m[e];
                                return t ? t : (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
                            }) + '"' : '"' + e + '"';
                    case"number":
                        return isFinite(e) ? String(e) : "null";
                    case"boolean":
                    case"null":
                        return String(e);
                    case"object":
                        if (!e)return "null";
                        if ("function" == typeof e.toJSON)return stringify(e.toJSON());
                        if (n = [], "number" == typeof e.length && !e.propertyIsEnumerable("length")) {
                            for (i = e.length, r = 0; r < i; r += 1)n.push(stringify(e[r], t) || "null");
                            return "[" + n.join(",") + "]"
                        }
                        if (t)for (i = t.length, r = 0; r < i; r += 1)o = t[r], "string" == typeof o && (a = stringify(e[o], t), a && n.push(stringify(o) + ":" + a)); else for (o in e)"string" == typeof o && (a = stringify(e[o], t), a && n.push(stringify(o) + ":" + a));
                        return "{" + n.join(",") + "}"
                }
            }

            Date.prototype.toJSON = function () {
                return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
            };
            var m = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
            return {
                stringify: stringify, parse: function (text, filter) {
                    function walk(e, t) {
                        var n, r;
                        if (t && "object" == typeof t)for (n in t)Object.prototype.hasOwnProperty.apply(t, [n]) && (r = walk(n, t[n]), void 0 !== r ? t[n] = r : delete t[n]);
                        return filter(e, t)
                    }

                    var j;
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof filter ? walk("", j) : j;
                    throw new SyntaxError("parseJSON")
                }
            }
        }()
    }
}, function (module, exports, __webpack_require__) {
    var utility = __webpack_require__(1), song = __webpack_require__(3), special = __webpack_require__(5),
        mv = __webpack_require__(7), config = __webpack_require__(4), $ = __webpack_require__(8);
    module.exports = {
        init: function () {
            var e = this;
            e.herderUI(), e.navUI(), e.inputUI(), $(window).unload(function () {
                $.jStorage.set("KeyWord_local", null)
            })
        }, islogined: function () {
            var e = utility.read("KuGoo");
            return "" != e && "undefined" != e.toString() && e !== !1
        }, herderUI: function () {
            var _this = this, login_in = document.getElementById("login_in"),
                login_btn = document.getElementById("login_btn"), login_out = document.getElementById("login_out"),
                user_menu = document.getElementById("user_menu"), menuT = null;
            if (_this.islogined()) {
                var kugouC = utility.read("KuGoo"), user_name = kugouC.NickName.replace(/%/g, "\\"),
                    user = eval("'" + user_name + "'"), uer_img = kugouC.Pic;
                $("#login_in").hide(), $(login_out).show(), $(login_out).find(".user_img").attr("src", uer_img), $(login_out).find(".user_name").html(user)
            }
            $("#login_btn").on("click", function (e) {
                $.ajax({
                    url: "http://static.kgimg.com/common/js/min/popuplogin-min.js?" + Math.round((new Date).getTime() / 1e3),
                    dataType: "script",
                    success: function () {
                        UsLogin()
                    }
                })
            }), login_out.onmouseover = function () {
                user_menu.style.cssText = "display:block;"
            }, login_out.onmouseleave = function () {
                menuT = setTimeout(function () {
                    user_menu.style.display = "none"
                }, 300)
            }, login_out.onclick = function () {
                window.open("http://www.kugou.com/newuc/user/uc/")
            }, user_menu.onmouseover = function () {
                clearTimeout(menuT), user_menu.style.cssText = "display:block;"
            }, user_menu.onmouseleave = function () {
                user_menu.style.cssText = "display:none"
            }
        }, navUI: function () {
            var e = null, t = document.getElementById("more"), n = document.getElementById("showMore"),
                r = document.getElementById("secondMenu");
            n.onclick = function () {
                return !1
            }, t.onmouseover = function () {
                this.setAttribute("class", "more hover"), n.setAttribute("class", "icon icon-nav6"), r.style.cssText = "display:block;"
            }, t.onmouseleave = function () {
                this.setAttribute("class", "more"), n.setAttribute("class", "icon icon-nav6"), e = setTimeout(function () {
                    r.style.display = "none"
                }, 300)
            }, r.onmouseover = function () {
                clearTimeout(e), t.setAttribute("class", "more hover"), n.setAttribute("class", "icon icon-nav6"), r.style.cssText = "display:block;"
            }, r.onmouseleave = function () {
                t.setAttribute("class", "more"), n.setAttribute("class", "icon icon-nav6"), r.style.cssText = "display:none"
            }
        }, inputUI: function () {
            var e = this, t = $(".top_search .searh_btn"), n = $(".top_search_histroy"), r = $(".top_search_recommend"),
                o = $(".top_search .search_input input"), i = $(".content_search .search_input input"), a = null, s = 1,
                l = 2;
            n.on("click", ".clear_histroy", function () {
                localStorage.s_keyword = "", n.find(".history_song_list").empty(), n.removeClass("show").addClass("hide")
            }), t.on("click", function () {
                $(this).parent().parent().hasClass("content_search") ? config.fo = "搜索页" : config.fo = "头部导航栏", config.searchKeyWord = o.val(), "" == config.searchKeyWord && (config.searchKeyWord = o.attr("placeholder")), $(".content_search .search_input input").val(config.searchKeyWord), e.resetSearchSetting(function () {
                    config.searchType = "song", e.showActive("song")
                })
            }), o.on("keydown", function (t) {
                var i = (o.val(), $(".top_search_histroy dd")),
                    a = $(".top_search_recommend dl.recommend_song_list dd"),
                    c = $(".top_search_recommend dl.recommend_mv_list dd"),
                    h = $(".top_search_histroy dd.hover").index(),
                    d = $(".top_search_recommend .recommend_song_list dd.hover").index(),
                    u = $(".top_search_recommend .recommend_mv_list dd.hover").index();
                13 === t.keyCode ? (config.fo = "头部导航栏", e.resetSearchSetting(function () {
                    config.searchType = "song", config.searchKeyWord = o.val(), $(".content_search .search_input input").val(config.searchKeyWord), e.showActive(config.searchType)
                }), n.removeClass("show").addClass("hide"), r.removeClass("show").addClass("hide")) : 38 == t.keyCode ? (l = d != -1 ? 1 : 2, n.hasClass("show") ? h + 1 == 0 ? i.eq(i.length - 1).addClass("hover").siblings("dd").removeClass("hover") : i.eq(h - 1).addClass("hover").siblings("dd").removeClass("hover") : r.hasClass("show") && (0 == c.length && 0 != a.length && (l = 1, d + 1 == 0 ? (l = 1, a.removeClass("hover"), a.eq(a.length - 1).addClass("hover")) : (l = 1, a.removeClass("hover"), a.eq(d - 1).addClass("hover"))), 0 == a.length && 0 != c.length && (l = 2, u + 1 == 0 ? (a.removeClass("hover"), c.eq(c.length - 1).addClass("hover")) : (c.removeClass("hover"), c.eq(u - 1).addClass("hover"))), 0 != a.length && 0 != c.length && (1 == l ? 0 == d ? (l = 2, a.removeClass("hover"), c.eq(c.length - 1).addClass("hover")) : (a.removeClass("hover"), a.eq(d - 1).addClass("hover")) : u + 1 == 0 ? (a.removeClass("hover"), c.eq(c.length - 1).addClass("hover")) : 0 == u ? (l = 1, c.removeClass("hover"), a.eq(a.length - 1).addClass("hover")) : (c.removeClass("hover"), c.eq(u - 1).addClass("hover")))), n.hasClass("show") ? o.val($(".search_histroy dd.hover").attr("title")) : r.hasClass("show") && (1 == l ? o.val($(".top_search_recommend .recommend_song_list dd.hover").attr("title")) : o.val($(".top_search_recommend .recommend_mv_list dd.hover").attr("title")))) : 40 == t.keyCode && (n.hasClass("show") ? h + 1 == i.length ? i.eq(0).addClass("hover").siblings("dd").removeClass("hover") : i.eq(h + 1).addClass("hover").siblings("dd").removeClass("hover") : r.hasClass("show") && (0 == c.length && 0 != a.length && (s = 1, d + 1 == a.length ? (a.removeClass("hover"), a.eq(0).addClass("hover")) : (a.removeClass("hover"), a.eq(d + 1).addClass("hover"))), 0 == a.length && 0 != c.length && (s = 2, u + 1 == a.length ? (c.removeClass("hover"), c.eq(0).addClass("hover")) : (c.removeClass("hover"), c.eq(u + 1).addClass("hover"))), 0 != a.length && 0 != c.length && (1 == s ? d + 1 == 0 ? (c.removeClass("hover"), a.eq(0).addClass("hover")) : d + 1 == a.length ? (s = 2, a.removeClass("hover"), c.eq(0).addClass("hover")) : (a.removeClass("hover"), a.eq(d + 1).addClass("hover")) : u + 1 == c.length ? (s = 1, c.removeClass("hover"), a.eq(0).addClass("hover")) : (c.removeClass("hover"), c.eq(u + 1).addClass("hover")))), n.hasClass("show") ? o.val($(".search_histroy dd.hover").attr("title")) : r.hasClass("show") && (1 == s ? o.val($(".top_search_recommend .recommend_song_list dd.hover").attr("title")) : o.val($(".top_search_recommend .recommend_mv_list dd.hover").attr("title"))))
            }).on("click", function () {
                config.defaultKey = !1, e.displayTip()
            }).on("textchange", function () {
                config.defaultKey || e.displayTip()
            }).on("blur", function () {
                a = setTimeout(function () {
                    n.hasClass("noData") || n.addClass("hide").removeClass("show"), r.addClass("hide").removeClass("show")
                }, 400)
            }), n.mouseover(function () {
                clearTimeout(a), n.removeClass("hide").addClass("show")
            }), n.on("click", "dd", function () {
                config.fo = "头部导航栏";
                var t = $(this);
                return o.val(utility.SIPHtmlDecode(t.attr("title"))), i.val(utility.SIPHtmlDecode(t.attr("title"))), e.resetSearchSetting(function () {
                    config.searchType = "song", config.searchKeyWord = utility.SIPHtmlDecode(t.attr("title")), e.showActive("song")
                }), n.removeClass("show").addClass("hide"), !1
            }), r.mouseover(function () {
                clearTimeout(a), n.removeClass("hide").addClass("show")
            }), r.on("click", "dd", function () {
                config.fo = "头部导航栏";
                var t = $(this), n = utility.SIPHtmlDecode(t.attr("title"));
                return o.val(n), i.val(n), utility.keywordStorge(n), e.resetSearchSetting(function () {
                    config.searchType = t.attr("data-type"), config.searchKeyWord = n, e.showActive(config.searchType)
                }), r.removeClass("show").addClass("hide"), !1
            })
        }, displayTip: function () {
            var e = this, t = $(".top_search_histroy"), n = $(".top_search_recommend"),
                r = $(".top_search .search_input input"), o = null;
            "" != r.val() ? (t.fadeOut(100).addClass("hide").removeClass("show"), clearTimeout(o), o = setTimeout(function () {
                e.wordRecommend({
                    keyword: r.val(), callback: function (e) {
                        "" != e && n.html(e).fadeIn(100).addClass("show").removeClass("hide")
                    }
                })
            }, 10)) : (n.fadeOut(100).addClass("hide").removeClass("show"), e.historyHtml(function (e) {
                "" != e ? t.html(e).fadeIn(100).addClass("show").removeClass("hide") : t.addClass("noData")
            }))
        }, wordRecommend: function (e) {
            var t = {keyword: "", MusicTipCount: 5, MVTipCount: 2, albumcount: 2}, n = this, r = $.extend(t, e);
            $.ajax({
                type: "GET",
                url: "http://searchtip.kugou.com/getSearchTip?MusicTipCount=5&MVTipCount=2&albumcount=2&keyword=" + encodeURIComponent(r.keyword),
                crossDomain: !0,
                dataType: "jsonp",
                success: function (t) {
                    if (1 == t.status) {
                        if (t.data) {
                            var o = n.RecommendHtml(t.data, r.keyword);
                            e.callback(o)
                        }
                    } else e.callback("")
                },
                error: function (t) {
                    e.callback("")
                }
            })
        }, RecommendHtml: function (wordData, keyword) {
            try {
                var recommendSongstr = "<dl class='recommend_song_list recommend_list'>",
                    recommendMvstr = "<h4><span class='icon_arrow'></span>MV</h2><dl class='recommend_mv_list recommend_list'>",
                    songData = null, mvData = null;
                if (wordData[0] && (songData = wordData[0].RecordDatas), wordData[1] && (mvData = wordData[1].RecordDatas), 0 == songData.length) recommendSongstr = ""; else {
                    for (var i = 0, Songlen = songData.length; i < Songlen; i++) {
                        var matchText = "/" + keyword + "/",
                            textem = songData[i].HintInfo.replace(eval(matchText), "<em>" + keyword + "</em>");
                        recommendSongstr += "<dd data-type='song' title='" + songData[i].HintInfo + "'>" + textem + "</dd>"
                    }
                    recommendSongstr += "</dl>"
                }
                if (0 == mvData.length)return recommendSongstr;
                for (var j = 0, Mvlen = mvData.length; j < Mvlen; j++) {
                    var matchText = "/" + keyword + "/",
                        textem = mvData[j].HintInfo.replace(eval(matchText), "<em>" + keyword + "</em>");
                    recommendMvstr += "<dd data-type='mv' title='" + mvData[j].HintInfo + "'>" + textem + "</dd>"
                }
                return recommendMvstr += "</dl>", recommendSongstr + recommendMvstr
            } catch (e) {
            }
        }, historyHtml: function (e) {
            var t = [];
            if ("" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (t = localStorage.s_keyword.split("|").reverse()), "undefined" != typeof t)if (0 == t.length) e(""); else {
                for (var n = "<dl class='history_song_list'>", r = 0, o = t.length; r < o; r++)n += '<dd title="' + t[r] + '">' + t[r] + "</dd>";
                n += "</dl><dl class='clear_histroy'><dt>清空历史记录</dt></dl>", e(n)
            }
        }, resetSearchSetting: function (e) {
            var t = $(".search_tab li"), n = document.getElementById("downlaod"),
                r = document.getElementById("before_page"), o = document.getElementById("search_song"),
                i = document.getElementById("search_special"), a = document.getElementById("search_mv");
            t.eq(0).addClass("active").siblings("li").removeClass("active"), n.style.cssText = "display:none", r.style.cssText = "display:block", $(o).find(".list_content").empty(), o.style.cssText = "display:block", $(o).find(".similar_singer").hide(), $(".checkall").removeClass("checked"), $(i).find(".list_content").empty(), i.style.cssText = "display:none", $(a).find(".mv_list ul").empty(), a.style.cssText = "display:none", config.searchType = "song", config.searchSongIndex = 1, config.searchSongfinish = !1, config.searchSongLoading = !1, config.searchSpecialIndex = 1, config.searchSpecialLoading = !1, config.searchSpecialfinish = !1, config.searchMvIndex = 1, config.searchMvLoading = !1, config.searchMvfinish = !1, e && e()
        }, showActive: function (e) {
            var t = $(".search_tab li"), n = document.getElementById("downlaod"),
                r = document.getElementById("search_song"), o = document.getElementById("search_special"),
                i = document.getElementById("search_mv"), a = document.referrer, s = utility.read("KuGoo"),
                l = {a: 5, b: "搜索", action: "index"};
            switch (l.uid = s.KugooID || null, l.os = utility.detectOS(), l.flash = utility.flashChecker().v || "null", l.ivar4 = config.searchKeyWord, l.lvt = utility.formatDateTime(new Date), l.fo = config.fo, a.indexOf("baidu.com") != -1 ? "百度搜索" == l.o : a.indexOf("so.com") != -1 ? l.o = "360搜索" : a.indexOf("360.cn") != -1 ? l.o = "360导航页" : a.indexOf("google.com") != -1 ? l.o = "谷歌搜索" : "" == a || a.indexOf("kugou.com") != -1 || a.indexOf("download.com") != -1 ? l.o = "直接访问" : "" != a && (l.o = "其他访问"), location.hash = "searchType=" + e + "&searchKeyWord=" + config.searchKeyWord, e) {
                case"song":
                    if (l.ivar5 = "歌曲", config.searchType = "song", t.eq(0).addClass("active").siblings("li").removeClass("active"), i.style.cssText = "display:none", o.style.cssText = "display:none", 0 == $(r).find(".list_content li").length) {
                        config.searchSongIndex = 1, song.getSongs({
                            keyword: config.searchKeyWord,
                            page: 1
                        }), r.style.cssText = "display:block";
                        var c = [30032, l, null];
                        apmCollectData.push(c);
                        try {
                            newLogCount()
                        } catch (e) {
                        }
                    } else r.style.cssText = "display:block";
                    n.style.cssText = "display:block";
                    break;
                case"special":
                    if (l.ivar5 = "歌单", config.searchType = "special", t.eq(1).addClass("active").siblings("li").removeClass("active"), r.style.cssText = "display:none", i.style.cssText = "display:none", 0 == $(o).find(".list_content li").length) {
                        config.searchSpecialIndex = 1, special.getSpecials({
                            keyword: config.searchKeyWord,
                            page: 1
                        }), o.style.cssText = "display:block";
                        var c = [30032, l, null];
                        apmCollectData.push(c);
                        try {
                            newLogCount()
                        } catch (e) {
                        }
                    } else o.style.cssText = "display:block";
                    n.style.cssText = "display:block";
                    break;
                case"mv":
                    if (l.ivar5 = "MV", config.searchType = "mv", t.eq(2).addClass("active").siblings("li").removeClass("active"), r.style.cssText = "display:none", o.style.cssText = "display:none", 0 == $(i).find(".mv_list li").length) {
                        config.searchMvIndex = 1, mv.getMvs({
                            keyword: config.searchKeyWord,
                            page: 1
                        }), i.style.cssText = "display:block";
                        var c = [30032, l, null];
                        apmCollectData.push(c);
                        try {
                            newLogCount()
                        } catch (e) {
                        }
                    } else i.style.cssText = "display:block";
                    n.style.cssText = "display:block";
                    break;
                default:
                    if (l.ivar5 = "歌曲", config.searchType = "song", t.eq(0).addClass("active").siblings("li").removeClass("active"), i.style.cssText = "display:none", o.style.cssText = "display:none", 0 == $(r).find(".list_content li").length) {
                        config.searchSongIndex = 1, song.getSongs({
                            keyword: config.searchKeyWord,
                            page: 1
                        }), r.style.cssText = "display:block";
                        var c = [30032, l, null];
                        apmCollectData.push(c);
                        try {
                            newLogCount()
                        } catch (e) {
                        }
                    } else r.style.cssText = "display:block";
                    n.style.cssText = "display:block"
            }
        }
    }
}, function (e, exports, t) {
    var n = t(1), r = t(4);
    e.exports = {
        datacache: {searchSongData: [], searchSongSelectData: []}, bindUI: function () {
            $(".song_list .list_content").off("click").on("click", "li", function (e) {
                "EM" != e.target.nodeName && "A" != e.target.nodeName && "SPAN" == e.target.nodeName && ($(e.target).hasClass("checked") && $(".checkall").removeClass("checked"), $(e.target).hasClass("checkbox") && ($(e.target).hasClass("checked") ? $(e.target).removeClass("checked") : $(e.target).addClass("checked")), $(".list_content .checked").length === $(".list_content .checkbox").length && $(".checkall").addClass("checked"))
            })
        }, getSongs: function (e) {
            var t = this, o = document.getElementById("search_song"), i = document.getElementById("before_page"),
                a = document.getElementById("downlaod"), s = {
                    keyword: "",
                    page: 1,
                    pagesize: 30,
                    userid: -1,
                    clientver: "",
                    platform: "WebFilter",
                    tag: "em",
                    filter: 2,
                    iscorrection: 1,
                    privilege_filter: 0
                };
            r.searchSongLoading = !0;
            var l = $.extend(s, e);
            "" != l.keyword ? (n.keywordStorge(l.keyword), $(o).find(".search_key_word i").html("“" + l.keyword + "”")) : $(o).find(".search_key_word i").html(""), $(i).show(), $.ajax({
                type: "GET",
                url: "http://songsearch.kugou.com/song_search_v2",
                data: l,
                timeout: 3e3,
                crossDomain: !0,
                dataType: "jsonp",
                success: function (e) {
                    if (1 == e.status) {
                        var s = e.data.total;
                        if (s > 0) {
                            var c = e.data.lists, h = t.datacache.searchSongData;
                            if (n.insertArrayAt(h, h.length, c), "scroll" == l.from ? (t.getRecommendSinger(l.keyword), t.datacache.searchSongData.push(c)) : t.datacache.searchSongData = c, c.length > 0 && n.isArray(c)) {
                                var d = t.getSongsHtml(c);
                                $(o).find(".list_content").html(d), r.searchSongLoading = !1
                            } else r.searchSongfinish = !0
                        }
                        a.style.cssText = "display:block", $(i).hide()
                    }
                },
                error: function (e) {
                    return $(i).hide(), r.searchSongLoading = !1, a.style.cssText = "display:block", {status: 0}
                }
            }), "scroll" != l.from && t.getRecommendSinger(l.keyword), t.bindUI()
        }, getSongsHtml: function (e) {
            if (0 != e.length) {
                for (var t = [], r = null, o = 0, i = e.length; o < i; o++) {
                    var a = "", s = "http://www.kugou.com/yy/album/single/" + e[o].AlbumID + ".html";
                    "" != e[o].AlbumName && (a = "《" + e[o].AlbumName + "》");
                    var l = n.delHtmlTag(e[o].FileName), c = n.delHtmlTag(a), h = n.getMS(1e3 * e[o].Duration);
                    r = $(["<li class='clearfix'>", '<div  class="width_f_li clearfix"><span class="search_icon checkbox"></span>', '<a class="song_name"  title="' + l + '" href="javascript:;">' + e[o].FileName + "</a>", "</div>", '<div class="width_s_li"><a class="album_name" title="' + c + '" target="_blank"  href="' + s + '">' + a + "</a>&nbsp;</div>", '<div class="width_t_li">' + h + "</div>", '<div class="play-item"  ><span class="common_icon icon_play"></span><span class="common_icon icon_download" onclick="_hmt.push([\'_trackEvent\', \'hidedown\', \'hidecilick\', \'hidepc\']);"></span><span class="common_icon icon_share"></span></div>', "</li>"].join("")), r.data("song", e[o]), t.push(r)
                }
                return t
            }
        }, getRecommendSinger: function (e) {
            songEle = document.getElementById("search_song"), $.ajax({
                type: "GET",
                url: "http://so.service.kugou.com/get/complex",
                data: {word: e},
                dataType: "jsonp",
                success: function (t) {
                    if (1 == t[0].status && 1 == t[0].ctype) {
                        var n = t[0].data[1];
                        n.singername == e ? ($(songEle).find(".similar_singer").show(), $(songEle).find(".singer_img").attr("href", "http://www.kugou.com/singer/" + n.singerid + ".html"), $(songEle).find(".singer_img png").attr("src", n.img), $(songEle).find(".singer_name").html('<a target="_blank" href="http://www.kugou.com/singer/' + n.singerid + '.html" >' + n.singername + "</a>"), $(songEle).find(".singer_info span").eq(0).html('<a target="_blank" href="http://www.kugou.com/singer/' + n.singerid + '.html"><i>' + n.song_count + "</i>单曲</a> "), $(songEle).find(".singer_info span").eq(1).html('<a target="_blank" href="http://www.kugou.com/singer/' + n.singerid + '.html?mv"><i>' + n.mv_count + "</i>MV</a>")) : $(songEle).find(".similar_singer").hide()
                    } else $(songEle).find(".similar_singer").hide()
                },
                error: function (e) {
                    $(songEle).find(".similar_singer").hide()
                }
            })
        }
    }
}, function (e, exports) {
    e.exports = {
        defaultKey: !1,
        searchType: "song",
        searchSongIndex: 1,
        searchSongfinish: !1,
        searchSongLoading: !1,
        searchSpecialIndex: 1,
        searchSpecialLoading: !1,
        searchSpecialfinish: !1,
        searchMvIndex: 1,
        searchMvLoading: !1,
        searchMvfinish: !1,
        fo: "头部导航栏"
    }
}, function (e, exports, t) {
    var n = t(1), r = t(6), o = t(4);
    e.exports = {
        datacache: {searchSpecialData: []}, getSpecials: function (e) {
            var t = this, r = document.getElementById("search_special"), i = document.getElementById("before_page"),
                a = document.getElementById("downlaod"), s = {
                    keyword: "刘德华",
                    page: 1,
                    pagesize: 30,
                    userid: -1,
                    clientver: "",
                    platform: "WebFilter",
                    tag: "em",
                    filter: 2,
                    iscorrection: 1,
                    privilege_filter: 0
                };
            o.searchSpecialLoading = !0;
            var l = $.extend(s, e);
            if ("" != l.keyword) {
                var c = [];
                "" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (c = localStorage.s_keyword.split("|")), c = n.unique(c), localStorage.s_keyword = c.join("|"), $(r).find(".search_key_word i").html("“" + l.keyword + "”")
            } else $(r).find(".search_key_word i").html("");
            $(i).show(), $.ajax({
                type: "GET",
                url: "http://specialsearch.kugou.com/special_search",
                data: l,
                timeout: 3e3,
                crossDomain: !0,
                dataType: "jsonp",
                success: function (e) {
                    if (1 == e.status) {
                        var s = e.data.total;
                        if (s > 0) {
                            var l = e.data.lists, c = t.datacache.searchSpecialData;
                            if (n.insertArrayAt(c, c.length, l), l.length > 0 && n.isArray(l)) {
                                var h = t.getSpecialsHtml(l);
                                $(r).find(".list_content").html(h), o.searchSpecialLoading = !1
                            } else o.searchSpecialfinish = !0
                        }
                        $(i).hide(), a.style.cssText = "display:block"
                    }
                },
                error: function (e) {
                    return $(i).hide(), o.searchSpecialLoading = !1, a.style.cssText = "display:block", {status: 0}
                }
            })
        }, getSpecialsHtml: function (e) {
            if (0 != e.length) {
                for (var t = "", r = 0, o = e.length; r < o; r++) {
                    e[r].total_play_count.toString().length > 4 && (e[r].total_play_count = (e[r].total_play_count / 1e4).toFixed(1) + "万");
                    var i = n.delHtmlTag(e[r].specialname), a = n.delHtmlTag(e[r].nickname);
                    t += ["<li>", '<div  class="width_f_li clearfix"><a class="special_link" target="_blank"  title="' + i + '" href="http://www.kugou.com/yy/special/single/' + e[r].specialid + '.html"><png class="special_img" src="' + e[r].img + '"></a>', '<a target="_blank" class="special_name special_link" title="' + i + '" href="http://www.kugou.com/yy/special/single/' + e[r].specialid + '.html">' + e[r].specialname + "</a>", "&nbsp;</div>", '<div class="width_s_li" title="' + a + '">' + e[r].nickname + "</div>", '<div class="width_t_li">' + e[r].total_play_count + "</div>", '<div class="play-item" ><span data="' + e[r].specialid + '" class="search_icon icon_play"></div>', "</li>"].join("")
                }
                return t
            }
        }, getSpecialSongs: function (e, t) {
            var n = {appid: 1014, clientver: 1022, mid: "iYw1iw8z2ji2iphcu80oOo2ki8112p"},
                o = r.md5(n.appid + n.mid + n.clientver + Math.round((new Date).getTime() / 1e3)), i = {
                    show_video: 0,
                    show_obbligato: 0,
                    collection_id: "",
                    appid: n.appid,
                    clientver: n.clientver,
                    mid: n.mid,
                    clienttime: Math.round((new Date).getTime() / 1e3),
                    key: o
                }, a = $.extend(i, e);
            $.ajax({
                type: "POST",
                url: "http://www.kugou.com/yy/index.php?r=play/getsong&id=" + a.collection_id,
                cache: !1,
                dataType: "json",
                success: function (e) {
                    t(1 == e.status ? e.data : [])
                },
                error: function (e) {
                    t([])
                }
            })
        }
    }
}, function (e, exports) {
    var t = {
        hex_chr: "0123456789abcdef", rhex: function (e) {
            for (var t = "", n = 0; n <= 3; n++)t += this.hex_chr.charAt(e >> 8 * n + 4 & 15) + this.hex_chr.charAt(e >> 8 * n & 15);
            return t
        }, str2blks_MD5: function (e) {
            for (var t = (e.length + 8 >> 6) + 1, n = new Array(16 * t), r = 0; r < 16 * t; r++)n[r] = 0;
            for (var r = 0; r < e.length; r++)n[r >> 2] |= e.charCodeAt(r) << r % 4 * 8;
            return n[r >> 2] |= 128 << r % 4 * 8, n[16 * t - 2] = 8 * e.length, n
        }, add: function (e, t) {
            var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
            return r << 16 | 65535 & n
        }, rol: function (e, t) {
            return e << t | e >>> 32 - t
        }, cmn: function (e, t, n, r, o, i) {
            return this.add(this.rol(this.add(this.add(t, e), this.add(r, i)), o), n)
        }, ff: function (e, t, n, r, o, i, a) {
            return this.cmn(t & n | ~t & r, e, t, o, i, a)
        }, gg: function (e, t, n, r, o, i, a) {
            return this.cmn(t & r | n & ~r, e, t, o, i, a)
        }, hh: function (e, t, n, r, o, i, a) {
            return this.cmn(t ^ n ^ r, e, t, o, i, a)
        }, ii: function (e, t, n, r, o, i, a) {
            return this.cmn(n ^ (t | ~r), e, t, o, i, a)
        }, md5: function (e) {
            for (var t = this.str2blks_MD5(e), n = 1732584193, r = -271733879, o = -1732584194, i = 271733878, a = 0; a < t.length; a += 16) {
                var s = n, l = r, c = o, h = i;
                n = this.ff(n, r, o, i, t[a + 0], 7, -680876936), i = this.ff(i, n, r, o, t[a + 1], 12, -389564586), o = this.ff(o, i, n, r, t[a + 2], 17, 606105819), r = this.ff(r, o, i, n, t[a + 3], 22, -1044525330), n = this.ff(n, r, o, i, t[a + 4], 7, -176418897), i = this.ff(i, n, r, o, t[a + 5], 12, 1200080426), o = this.ff(o, i, n, r, t[a + 6], 17, -1473231341), r = this.ff(r, o, i, n, t[a + 7], 22, -45705983), n = this.ff(n, r, o, i, t[a + 8], 7, 1770035416), i = this.ff(i, n, r, o, t[a + 9], 12, -1958414417), o = this.ff(o, i, n, r, t[a + 10], 17, -42063), r = this.ff(r, o, i, n, t[a + 11], 22, -1990404162), n = this.ff(n, r, o, i, t[a + 12], 7, 1804603682), i = this.ff(i, n, r, o, t[a + 13], 12, -40341101), o = this.ff(o, i, n, r, t[a + 14], 17, -1502002290), r = this.ff(r, o, i, n, t[a + 15], 22, 1236535329), n = this.gg(n, r, o, i, t[a + 1], 5, -165796510), i = this.gg(i, n, r, o, t[a + 6], 9, -1069501632), o = this.gg(o, i, n, r, t[a + 11], 14, 643717713), r = this.gg(r, o, i, n, t[a + 0], 20, -373897302), n = this.gg(n, r, o, i, t[a + 5], 5, -701558691), i = this.gg(i, n, r, o, t[a + 10], 9, 38016083), o = this.gg(o, i, n, r, t[a + 15], 14, -660478335), r = this.gg(r, o, i, n, t[a + 4], 20, -405537848), n = this.gg(n, r, o, i, t[a + 9], 5, 568446438), i = this.gg(i, n, r, o, t[a + 14], 9, -1019803690), o = this.gg(o, i, n, r, t[a + 3], 14, -187363961), r = this.gg(r, o, i, n, t[a + 8], 20, 1163531501), n = this.gg(n, r, o, i, t[a + 13], 5, -1444681467), i = this.gg(i, n, r, o, t[a + 2], 9, -51403784), o = this.gg(o, i, n, r, t[a + 7], 14, 1735328473), r = this.gg(r, o, i, n, t[a + 12], 20, -1926607734), n = this.hh(n, r, o, i, t[a + 5], 4, -378558), i = this.hh(i, n, r, o, t[a + 8], 11, -2022574463), o = this.hh(o, i, n, r, t[a + 11], 16, 1839030562), r = this.hh(r, o, i, n, t[a + 14], 23, -35309556), n = this.hh(n, r, o, i, t[a + 1], 4, -1530992060), i = this.hh(i, n, r, o, t[a + 4], 11, 1272893353), o = this.hh(o, i, n, r, t[a + 7], 16, -155497632), r = this.hh(r, o, i, n, t[a + 10], 23, -1094730640), n = this.hh(n, r, o, i, t[a + 13], 4, 681279174), i = this.hh(i, n, r, o, t[a + 0], 11, -358537222), o = this.hh(o, i, n, r, t[a + 3], 16, -722521979), r = this.hh(r, o, i, n, t[a + 6], 23, 76029189), n = this.hh(n, r, o, i, t[a + 9], 4, -640364487), i = this.hh(i, n, r, o, t[a + 12], 11, -421815835), o = this.hh(o, i, n, r, t[a + 15], 16, 530742520), r = this.hh(r, o, i, n, t[a + 2], 23, -995338651), n = this.ii(n, r, o, i, t[a + 0], 6, -198630844), i = this.ii(i, n, r, o, t[a + 7], 10, 1126891415), o = this.ii(o, i, n, r, t[a + 14], 15, -1416354905), r = this.ii(r, o, i, n, t[a + 5], 21, -57434055), n = this.ii(n, r, o, i, t[a + 12], 6, 1700485571), i = this.ii(i, n, r, o, t[a + 3], 10, -1894986606), o = this.ii(o, i, n, r, t[a + 10], 15, -1051523), r = this.ii(r, o, i, n, t[a + 1], 21, -2054922799), n = this.ii(n, r, o, i, t[a + 8], 6, 1873313359), i = this.ii(i, n, r, o, t[a + 15], 10, -30611744), o = this.ii(o, i, n, r, t[a + 6], 15, -1560198380), r = this.ii(r, o, i, n, t[a + 13], 21, 1309151649), n = this.ii(n, r, o, i, t[a + 4], 6, -145523070), i = this.ii(i, n, r, o, t[a + 11], 10, -1120210379), o = this.ii(o, i, n, r, t[a + 2], 15, 718787259), r = this.ii(r, o, i, n, t[a + 9], 21, -343485551), n = this.add(n, s), r = this.add(r, l), o = this.add(o, c), i = this.add(i, h)
            }
            return this.rhex(n) + this.rhex(r) + this.rhex(o) + this.rhex(i)
        }
    };
    e.exports = t
}, function (e, exports, t) {
    var n = t(1), r = t(4);
    e.exports = {
        getMvs: function (e) {
            var t = this, o = document.getElementById("search_mv"), i = document.getElementById("before_page"),
                a = document.getElementById("downlaod"), s = {
                    keyword: "刘德华",
                    page: 1,
                    pagesize: 30,
                    userid: -1,
                    clientver: "",
                    platform: "WebFilter",
                    tag: "em",
                    filter: 2,
                    iscorrection: 1,
                    privilege_filter: 0
                };
            r.searchMvLoading = !0;
            var l = $.extend(s, e);
            if ("" != l.keyword) {
                var c = [];
                "" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (c = localStorage.s_keyword.split("|")), c = n.unique(c), localStorage.s_keyword = c.join("|"), $(o).find(".search_key_word i").html("“" + l.keyword + "”")
            } else $(o).find(".search_key_word i").html("");
            $(i).show(), $.ajax({
                type: "GET",
                url: "http://mvsearch.kugou.com/mv_search",
                data: l,
                timeout: 3e3,
                crossDomain: !0,
                dataType: "jsonp",
                success: function (e) {
                    if (1 == e.status) {
                        var s = e.data.total;
                        if (s > 0) {
                            var l = e.data.lists;
                            if (l.length > 0 && n.isArray(l)) {
                                var c = t.getMvsHtml(l);
                                $(o).find(".mv_list ul").html(c), r.searchMvLoading = !1
                            } else r.searchMvfinish = !0
                        }
                        a.style.cssText = "display:block", $(i).hide()
                    }
                },
                error: function (e) {
                    return $(i).hide(), r.searchMvLoading = !1, a.style.cssText = "display:block", {status: 0}
                }
            })
        }, getMvsHtml: function (e) {
            if (0 != e.length) {
                for (var t = "", r = 0, o = e.length; r < o; r++) {
                    var i = "http://www.kugou.com/mvweb/html/mv_" + e[r].MvID + ".html",
                        a = "http://imge.kugou.com/mvhdpic/240/" + e[r].Pic.substring(0, 8) + "/" + e[r].Pic,
                        s = n.delHtmlTag(e[r].MvName), l = n.delHtmlTag(e[r].SingerName);
                    t += ["<li>", '<div class="mv_container">', '<a class="mv_cover"  target="_blank" href="' + i + '" hidefocus="true" title="' + s + '" > ', '<span class="mv_img">', '<png width="100%" height="100%" src="' + a + '"  alt=""  class="">', "</span> ", '<span class="mv_play"><i class="search_icon"></i></span>', '<span class="mv_shadow"></span>', "</a>", '<a class="mv_name" target="_blank"  href="' + i + '" hidefocus="true" data-index="' + r + '" data-type="" title="' + s + '">' + e[r].MvName + "</a> ", '<span class="mv_singer" title="' + l + '">' + e[r].SingerName + "</span>", "</div>", "</li>"].join("")
                }
                return t
            }
        }
    }
}, function (e, exports) {
    e.exports = window.$
}, function (e, exports, t) {
    !function (n) {
        "use strict";
        var r, o = n.Base64, i = "2.1.9";
        if ("undefined" != typeof e && e.exports)try {
            r = t(10).Buffer
        } catch (e) {
        }
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = function (e) {
            for (var t = {}, n = 0, r = e.length; n < r; n++)t[e.charAt(n)] = n;
            return t
        }(a), l = String.fromCharCode, c = function (e) {
            if (e.length < 2) {
                var t = e.charCodeAt(0);
                return t < 128 ? e : t < 2048 ? l(192 | t >>> 6) + l(128 | 63 & t) : l(224 | t >>> 12 & 15) + l(128 | t >>> 6 & 63) + l(128 | 63 & t)
            }
            var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return l(240 | t >>> 18 & 7) + l(128 | t >>> 12 & 63) + l(128 | t >>> 6 & 63) + l(128 | 63 & t)
        }, h = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, d = function (e) {
            return e.replace(h, c)
        }, u = function (e) {
            var t = [0, 2, 1][e.length % 3],
                n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0),
                r = [a.charAt(n >>> 18), a.charAt(n >>> 12 & 63), t >= 2 ? "=" : a.charAt(n >>> 6 & 63), t >= 1 ? "=" : a.charAt(63 & n)];
            return r.join("")
        }, f = n.btoa ? function (e) {
            return n.btoa(e)
        } : function (e) {
            return e.replace(/[\s\S]{1,3}/g, u)
        }, g = r ? function (e) {
            return (e.constructor === r.constructor ? e : new r(e)).toString("base64")
        } : function (e) {
            return f(d(e))
        }, m = function (e, t) {
            return t ? g(String(e)).replace(/[+\/]/g, function (e) {
                return "+" == e ? "-" : "_"
            }).replace(/=/g, "") : g(String(e))
        }, p = function (e) {
            return m(e, !0)
        }, v = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"), y = function (e) {
            switch (e.length) {
                case 4:
                    var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),
                        n = t - 65536;
                    return l((n >>> 10) + 55296) + l((1023 & n) + 56320);
                case 3:
                    return l((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                default:
                    return l((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
            }
        }, _ = function (e) {
            return e.replace(v, y)
        }, w = function (e) {
            var t = e.length, n = t % 4,
                r = (t > 0 ? s[e.charAt(0)] << 18 : 0) | (t > 1 ? s[e.charAt(1)] << 12 : 0) | (t > 2 ? s[e.charAt(2)] << 6 : 0) | (t > 3 ? s[e.charAt(3)] : 0),
                o = [l(r >>> 16), l(r >>> 8 & 255), l(255 & r)];
            return o.length -= [0, 0, 2, 1][n], o.join("")
        }, C = n.atob ? function (e) {
            return n.atob(e)
        } : function (e) {
            return e.replace(/[\s\S]{1,4}/g, w)
        }, k = r ? function (e) {
            return (e.constructor === r.constructor ? e : new r(e, "base64")).toString()
        } : function (e) {
            return _(C(e))
        }, b = function (e) {
            return k(String(e).replace(/[-_]/g, function (e) {
                return "-" == e ? "+" : "/"
            }).replace(/[^A-Za-z0-9\+\/]/g, ""))
        }, S = function () {
            var e = n.Base64;
            return n.Base64 = o, e
        };
        if (n.Base64 = {
                VERSION: i,
                atob: C,
                btoa: f,
                fromBase64: b,
                toBase64: m,
                utob: d,
                encode: m,
                encodeURI: p,
                btou: _,
                decode: b,
                noConflict: S
            }, "function" == typeof Object.defineProperty) {
            var T = function (e) {
                return {value: e, enumerable: !1, writable: !0, configurable: !0}
            };
            n.Base64.extendString = function () {
                Object.defineProperty(String.prototype, "fromBase64", T(function () {
                    return b(this)
                })), Object.defineProperty(String.prototype, "toBase64", T(function (e) {
                    return m(this, e)
                })), Object.defineProperty(String.prototype, "toBase64URI", T(function () {
                    return m(this, !0)
                }))
            }
        }
        n.Meteor && (Base64 = n.Base64)
    }(this)
}, function (e, exports, t) {
    (function (e) {/*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
        "use strict";
        function n() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype, foo: function () {
                        return 42
                    }
                }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
            } catch (e) {
                return !1
            }
        }

        function r() {
            return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function o(e, t) {
            if (r() < t)throw new RangeError("Invalid typed array length");
            return i.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = i.prototype) : (null === e && (e = new i(t)), e.length = t), e
        }

        function i(e, t, n) {
            if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i))return new i(e, t, n);
            if ("number" == typeof e) {
                if ("string" == typeof t)throw new Error("If encoding is specified then the first argument must be a string");
                return c(this, e)
            }
            return a(this, e, t, n)
        }

        function a(e, t, n, r) {
            if ("number" == typeof t)throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? u(e, t, n, r) : "string" == typeof t ? h(e, t, n) : f(e, t)
        }

        function s(e) {
            if ("number" != typeof e)throw new TypeError('"size" argument must be a number');
            if (e < 0)throw new RangeError('"size" argument must not be negative')
        }

        function l(e, t, n, r) {
            return s(t), t <= 0 ? o(e, t) : void 0 !== n ? "string" == typeof r ? o(e, t).fill(n, r) : o(e, t).fill(n) : o(e, t)
        }

        function c(e, t) {
            if (s(t), e = o(e, t < 0 ? 0 : 0 | g(t)), !i.TYPED_ARRAY_SUPPORT)for (var n = 0; n < t; ++n)e[n] = 0;
            return e
        }

        function h(e, t, n) {
            if ("string" == typeof n && "" !== n || (n = "utf8"), !i.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');
            var r = 0 | p(t, n);
            e = o(e, r);
            var a = e.write(t, n);
            return a !== r && (e = e.slice(0, a)), e
        }

        function d(e, t) {
            var n = t.length < 0 ? 0 : 0 | g(t.length);
            e = o(e, n);
            for (var r = 0; r < n; r += 1)e[r] = 255 & t[r];
            return e
        }

        function u(e, t, n, r) {
            if (t.byteLength, n < 0 || t.byteLength < n)throw new RangeError("'offset' is out of bounds");
            if (t.byteLength < n + (r || 0))throw new RangeError("'length' is out of bounds");
            return t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r), i.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = i.prototype) : e = d(e, t), e
        }

        function f(e, t) {
            if (i.isBuffer(t)) {
                var n = 0 | g(t.length);
                return e = o(e, n), 0 === e.length ? e : (t.copy(e, 0, 0, n), e)
            }
            if (t) {
                if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t)return "number" != typeof t.length || J(t.length) ? o(e, 0) : d(e, t);
                if ("Buffer" === t.type && Z(t.data))return d(e, t.data)
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }

        function g(e) {
            if (e >= r())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
            return 0 | e
        }

        function m(e) {
            return +e != e && (e = 0), i.alloc(+e)
        }

        function p(e, t) {
            if (i.isBuffer(e))return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var n = e.length;
            if (0 === n)return 0;
            for (var r = !1; ;)switch (t) {
                case"ascii":
                case"latin1":
                case"binary":
                    return n;
                case"utf8":
                case"utf-8":
                case void 0:
                    return K(e).length;
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return 2 * n;
                case"hex":
                    return n >>> 1;
                case"base64":
                    return Q(e).length;
                default:
                    if (r)return K(e).length;
                    t = ("" + t).toLowerCase(), r = !0
            }
        }

        function v(e, t, n) {
            var r = !1;
            if ((void 0 === t || t < 0) && (t = 0), t > this.length)return "";
            if ((void 0 === n || n > this.length) && (n = this.length), n <= 0)return "";
            if (n >>>= 0, t >>>= 0, n <= t)return "";
            for (e || (e = "utf8"); ;)switch (e) {
                case"hex":
                    return B(this, t, n);
                case"utf8":
                case"utf-8":
                    return E(this, t, n);
                case"ascii":
                    return D(this, t, n);
                case"latin1":
                case"binary":
                    return R(this, t, n);
                case"base64":
                    return A(this, t, n);
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return P(this, t, n);
                default:
                    if (r)throw new TypeError("Unknown encoding: " + e);
                    e = (e + "").toLowerCase(), r = !0
            }
        }

        function y(e, t, n) {
            var r = e[t];
            e[t] = e[n], e[n] = r
        }

        function _(e, t, n, r, o) {
            if (0 === e.length)return -1;
            if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                if (o)return -1;
                n = e.length - 1
            } else if (n < 0) {
                if (!o)return -1;
                n = 0
            }
            if ("string" == typeof t && (t = i.from(t, r)), i.isBuffer(t))return 0 === t.length ? -1 : w(e, t, n, r, o);
            if ("number" == typeof t)return t &= 255, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : w(e, [t], n, r, o);
            throw new TypeError("val must be string, number or Buffer")
        }

        function w(e, t, n, r, o) {
            function i(e, t) {
                return 1 === a ? e[t] : e.readUInt16BE(t * a)
            }

            var a = 1, s = e.length, l = t.length;
            if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (e.length < 2 || t.length < 2)return -1;
                a = 2, s /= 2, l /= 2, n /= 2
            }
            var c;
            if (o) {
                var h = -1;
                for (c = n; c < s; c++)if (i(e, c) === i(t, h === -1 ? 0 : c - h)) {
                    if (h === -1 && (h = c), c - h + 1 === l)return h * a
                } else h !== -1 && (c -= c - h), h = -1
            } else for (n + l > s && (n = s - l), c = n; c >= 0; c--) {
                for (var d = !0, u = 0; u < l; u++)if (i(e, c + u) !== i(t, u)) {
                    d = !1;
                    break
                }
                if (d)return c
            }
            return -1
        }

        function C(e, t, n, r) {
            n = Number(n) || 0;
            var o = e.length - n;
            r ? (r = Number(r), r > o && (r = o)) : r = o;
            var i = t.length;
            if (i % 2 !== 0)throw new TypeError("Invalid hex string");
            r > i / 2 && (r = i / 2);
            for (var a = 0; a < r; ++a) {
                var s = parseInt(t.substr(2 * a, 2), 16);
                if (isNaN(s))return a;
                e[n + a] = s
            }
            return a
        }

        function k(e, t, n, r) {
            return G(K(t, e.length - n), e, n, r)
        }

        function b(e, t, n, r) {
            return G(W(t), e, n, r)
        }

        function S(e, t, n, r) {
            return b(e, t, n, r)
        }

        function T(e, t, n, r) {
            return G(Q(t), e, n, r)
        }

        function x(e, t, n, r) {
            return G(z(t, e.length - n), e, n, r)
        }

        function A(e, t, n) {
            return 0 === t && n === e.length ? V.fromByteArray(e) : V.fromByteArray(e.slice(t, n))
        }

        function E(e, t, n) {
            n = Math.min(e.length, n);
            for (var r = [], o = t; o < n;) {
                var i = e[o], a = null, s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                if (o + s <= n) {
                    var l, c, h, d;
                    switch (s) {
                        case 1:
                            i < 128 && (a = i);
                            break;
                        case 2:
                            l = e[o + 1], 128 === (192 & l) && (d = (31 & i) << 6 | 63 & l, d > 127 && (a = d));
                            break;
                        case 3:
                            l = e[o + 1], c = e[o + 2], 128 === (192 & l) && 128 === (192 & c) && (d = (15 & i) << 12 | (63 & l) << 6 | 63 & c, d > 2047 && (d < 55296 || d > 57343) && (a = d));
                            break;
                        case 4:
                            l = e[o + 1], c = e[o + 2], h = e[o + 3], 128 === (192 & l) && 128 === (192 & c) && 128 === (192 & h) && (d = (15 & i) << 18 | (63 & l) << 12 | (63 & c) << 6 | 63 & h, d > 65535 && d < 1114112 && (a = d))
                    }
                }
                null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, r.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), r.push(a), o += s
            }
            return I(r)
        }

        function I(e) {
            var t = e.length;
            if (t <= ee)return String.fromCharCode.apply(String, e);
            for (var n = "", r = 0; r < t;)n += String.fromCharCode.apply(String, e.slice(r, r += ee));
            return n
        }

        function D(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var o = t; o < n; ++o)r += String.fromCharCode(127 & e[o]);
            return r
        }

        function R(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var o = t; o < n; ++o)r += String.fromCharCode(e[o]);
            return r
        }

        function B(e, t, n) {
            var r = e.length;
            (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
            for (var o = "", i = t; i < n; ++i)o += F(e[i]);
            return o
        }

        function P(e, t, n) {
            for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2)o += String.fromCharCode(r[i] + 256 * r[i + 1]);
            return o
        }

        function U(e, t, n) {
            if (e % 1 !== 0 || e < 0)throw new RangeError("offset is not uint");
            if (e + t > n)throw new RangeError("Trying to access beyond buffer length")
        }

        function M(e, t, n, r, o, a) {
            if (!i.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > o || t < a)throw new RangeError('"value" argument is out of bounds');
            if (n + r > e.length)throw new RangeError("Index out of range")
        }

        function j(e, t, n, r) {
            t < 0 && (t = 65535 + t + 1);
            for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o)e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
        }

        function O(e, t, n, r) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o)e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255
        }

        function q(e, t, n, r, o, i) {
            if (n + r > e.length)throw new RangeError("Index out of range");
            if (n < 0)throw new RangeError("Index out of range")
        }

        function H(e, t, n, r, o) {
            return o || q(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), X.write(e, t, n, r, 23, 4), n + 4
        }

        function N(e, t, n, r, o) {
            return o || q(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), X.write(e, t, n, r, 52, 8), n + 8
        }

        function L(e) {
            if (e = Y(e).replace(te, ""), e.length < 2)return "";
            for (; e.length % 4 !== 0;)e += "=";
            return e
        }

        function Y(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }

        function F(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        }

        function K(e, t) {
            t = t || 1 / 0;
            for (var n, r = e.length, o = null, i = [], a = 0; a < r; ++a) {
                if (n = e.charCodeAt(a), n > 55295 && n < 57344) {
                    if (!o) {
                        if (n > 56319) {
                            (t -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (t -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        o = n;
                        continue
                    }
                    if (n < 56320) {
                        (t -= 3) > -1 && i.push(239, 191, 189), o = n;
                        continue
                    }
                    n = (o - 55296 << 10 | n - 56320) + 65536
                } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                if (o = null, n < 128) {
                    if ((t -= 1) < 0)break;
                    i.push(n)
                } else if (n < 2048) {
                    if ((t -= 2) < 0)break;
                    i.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((t -= 3) < 0)break;
                    i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112))throw new Error("Invalid code point");
                    if ((t -= 4) < 0)break;
                    i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return i
        }

        function W(e) {
            for (var t = [], n = 0; n < e.length; ++n)t.push(255 & e.charCodeAt(n));
            return t
        }

        function z(e, t) {
            for (var n, r, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)n = e.charCodeAt(a), r = n >> 8, o = n % 256, i.push(o), i.push(r);
            return i
        }

        function Q(e) {
            return V.toByteArray(L(e))
        }

        function G(e, t, n, r) {
            for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o)t[o + n] = e[o];
            return o
        }

        function J(e) {
            return e !== e
        }

        var V = t(11), X = t(12), Z = t(13);
        exports.Buffer = i, exports.SlowBuffer = m, exports.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : n(), exports.kMaxLength = r(), i.poolSize = 8192, i._augment = function (e) {
            return e.__proto__ = i.prototype, e
        }, i.from = function (e, t, n) {
            return a(null, e, t, n)
        }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
            value: null,
            configurable: !0
        })), i.alloc = function (e, t, n) {
            return l(null, e, t, n)
        }, i.allocUnsafe = function (e) {
            return c(null, e)
        }, i.allocUnsafeSlow = function (e) {
            return c(null, e)
        }, i.isBuffer = function (e) {
            return !(null == e || !e._isBuffer)
        }, i.compare = function (e, t) {
            if (!i.isBuffer(e) || !i.isBuffer(t))throw new TypeError("Arguments must be Buffers");
            if (e === t)return 0;
            for (var n = e.length, r = t.length, o = 0, a = Math.min(n, r); o < a; ++o)if (e[o] !== t[o]) {
                n = e[o], r = t[o];
                break
            }
            return n < r ? -1 : r < n ? 1 : 0
        }, i.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
                case"hex":
                case"utf8":
                case"utf-8":
                case"ascii":
                case"latin1":
                case"binary":
                case"base64":
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, i.concat = function (e, t) {
            if (!Z(e))throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length)return i.alloc(0);
            var n;
            if (void 0 === t)for (t = 0, n = 0; n < e.length; ++n)t += e[n].length;
            var r = i.allocUnsafe(t), o = 0;
            for (n = 0; n < e.length; ++n) {
                var a = e[n];
                if (!i.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(r, o), o += a.length
            }
            return r
        }, i.byteLength = p, i.prototype._isBuffer = !0, i.prototype.swap16 = function () {
            var e = this.length;
            if (e % 2 !== 0)throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2)y(this, t, t + 1);
            return this
        }, i.prototype.swap32 = function () {
            var e = this.length;
            if (e % 4 !== 0)throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4)y(this, t, t + 3), y(this, t + 1, t + 2);
            return this
        }, i.prototype.swap64 = function () {
            var e = this.length;
            if (e % 8 !== 0)throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8)y(this, t, t + 7), y(this, t + 1, t + 6), y(this, t + 2, t + 5), y(this, t + 3, t + 4);
            return this
        }, i.prototype.toString = function () {
            var e = 0 | this.length;
            return 0 === e ? "" : 0 === arguments.length ? E(this, 0, e) : v.apply(this, arguments)
        }, i.prototype.equals = function (e) {
            if (!i.isBuffer(e))throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === i.compare(this, e)
        }, i.prototype.inspect = function () {
            var e = "", t = exports.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
        }, i.prototype.compare = function (e, t, n, r, o) {
            if (!i.isBuffer(e))throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length)throw new RangeError("out of range index");
            if (r >= o && t >= n)return 0;
            if (r >= o)return -1;
            if (t >= n)return 1;
            if (t >>>= 0, n >>>= 0, r >>>= 0, o >>>= 0, this === e)return 0;
            for (var a = o - r, s = n - t, l = Math.min(a, s), c = this.slice(r, o), h = e.slice(t, n), d = 0; d < l; ++d)if (c[d] !== h[d]) {
                a = c[d], s = h[d];
                break
            }
            return a < s ? -1 : s < a ? 1 : 0
        }, i.prototype.includes = function (e, t, n) {
            return this.indexOf(e, t, n) !== -1
        }, i.prototype.indexOf = function (e, t, n) {
            return _(this, e, t, n, !0)
        }, i.prototype.lastIndexOf = function (e, t, n) {
            return _(this, e, t, n, !1)
        }, i.prototype.write = function (e, t, n, r) {
            if (void 0 === t) r = "utf8", n = this.length, t = 0; else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0; else {
                if (!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
            }
            var o = this.length - t;
            if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length)throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var i = !1; ;)switch (r) {
                case"hex":
                    return C(this, e, t, n);
                case"utf8":
                case"utf-8":
                    return k(this, e, t, n);
                case"ascii":
                    return b(this, e, t, n);
                case"latin1":
                case"binary":
                    return S(this, e, t, n);
                case"base64":
                    return T(this, e, t, n);
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return x(this, e, t, n);
                default:
                    if (i)throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), i = !0
            }
        }, i.prototype.toJSON = function () {
            return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
        };
        var ee = 4096;
        i.prototype.slice = function (e, t) {
            var n = this.length;
            e = ~~e, t = void 0 === t ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
            var r;
            if (i.TYPED_ARRAY_SUPPORT) r = this.subarray(e, t), r.__proto__ = i.prototype; else {
                var o = t - e;
                r = new i(o, void 0);
                for (var a = 0; a < o; ++a)r[a] = this[a + e]
            }
            return r
        }, i.prototype.readUIntLE = function (e, t, n) {
            e |= 0, t |= 0, n || U(e, t, this.length);
            for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);)r += this[e + i] * o;
            return r
        }, i.prototype.readUIntBE = function (e, t, n) {
            e |= 0, t |= 0, n || U(e, t, this.length);
            for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);)r += this[e + --t] * o;
            return r
        }, i.prototype.readUInt8 = function (e, t) {
            return t || U(e, 1, this.length), this[e]
        }, i.prototype.readUInt16LE = function (e, t) {
            return t || U(e, 2, this.length), this[e] | this[e + 1] << 8
        }, i.prototype.readUInt16BE = function (e, t) {
            return t || U(e, 2, this.length), this[e] << 8 | this[e + 1]
        }, i.prototype.readUInt32LE = function (e, t) {
            return t || U(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }, i.prototype.readUInt32BE = function (e, t) {
            return t || U(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }, i.prototype.readIntLE = function (e, t, n) {
            e |= 0, t |= 0, n || U(e, t, this.length);
            for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);)r += this[e + i] * o;
            return o *= 128, r >= o && (r -= Math.pow(2, 8 * t)), r
        }, i.prototype.readIntBE = function (e, t, n) {
            e |= 0, t |= 0, n || U(e, t, this.length);
            for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256);)i += this[e + --r] * o;
            return o *= 128, i >= o && (i -= Math.pow(2, 8 * t)), i
        }, i.prototype.readInt8 = function (e, t) {
            return t || U(e, 1, this.length), 128 & this[e] ? (255 - this[e] + 1) * -1 : this[e]
        }, i.prototype.readInt16LE = function (e, t) {
            t || U(e, 2, this.length);
            var n = this[e] | this[e + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, i.prototype.readInt16BE = function (e, t) {
            t || U(e, 2, this.length);
            var n = this[e + 1] | this[e] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, i.prototype.readInt32LE = function (e, t) {
            return t || U(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }, i.prototype.readInt32BE = function (e, t) {
            return t || U(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }, i.prototype.readFloatLE = function (e, t) {
            return t || U(e, 4, this.length), X.read(this, e, !0, 23, 4)
        }, i.prototype.readFloatBE = function (e, t) {
            return t || U(e, 4, this.length), X.read(this, e, !1, 23, 4)
        }, i.prototype.readDoubleLE = function (e, t) {
            return t || U(e, 8, this.length), X.read(this, e, !0, 52, 8)
        }, i.prototype.readDoubleBE = function (e, t) {
            return t || U(e, 8, this.length), X.read(this, e, !1, 52, 8)
        }, i.prototype.writeUIntLE = function (e, t, n, r) {
            if (e = +e, t |= 0, n |= 0, !r) {
                var o = Math.pow(2, 8 * n) - 1;
                M(this, e, t, n, o, 0)
            }
            var i = 1, a = 0;
            for (this[t] = 255 & e; ++a < n && (i *= 256);)this[t + a] = e / i & 255;
            return t + n
        }, i.prototype.writeUIntBE = function (e, t, n, r) {
            if (e = +e, t |= 0, n |= 0, !r) {
                var o = Math.pow(2, 8 * n) - 1;
                M(this, e, t, n, o, 0)
            }
            var i = n - 1, a = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);)this[t + i] = e / a & 255;
            return t + n
        }, i.prototype.writeUInt8 = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
        }, i.prototype.writeUInt16LE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : j(this, e, t, !0), t + 2
        }, i.prototype.writeUInt16BE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : j(this, e, t, !1), t + 2
        }, i.prototype.writeUInt32LE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : O(this, e, t, !0), t + 4
        }, i.prototype.writeUInt32BE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : O(this, e, t, !1), t + 4
        }, i.prototype.writeIntLE = function (e, t, n, r) {
            if (e = +e, t |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                M(this, e, t, n, o - 1, -o)
            }
            var i = 0, a = 1, s = 0;
            for (this[t] = 255 & e; ++i < n && (a *= 256);)e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
            return t + n
        }, i.prototype.writeIntBE = function (e, t, n, r) {
            if (e = +e, t |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                M(this, e, t, n, o - 1, -o)
            }
            var i = n - 1, a = 1, s = 0;
            for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);)e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
            return t + n
        }, i.prototype.writeInt8 = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
        }, i.prototype.writeInt16LE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : j(this, e, t, !0), t + 2
        }, i.prototype.writeInt16BE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : j(this, e, t, !1), t + 2
        }, i.prototype.writeInt32LE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : O(this, e, t, !0), t + 4
        }, i.prototype.writeInt32BE = function (e, t, n) {
            return e = +e, t |= 0, n || M(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : O(this, e, t, !1), t + 4
        }, i.prototype.writeFloatLE = function (e, t, n) {
            return H(this, e, t, !0, n)
        }, i.prototype.writeFloatBE = function (e, t, n) {
            return H(this, e, t, !1, n)
        }, i.prototype.writeDoubleLE = function (e, t, n) {
            return N(this, e, t, !0, n)
        }, i.prototype.writeDoubleBE = function (e, t, n) {
            return N(this, e, t, !1, n)
        }, i.prototype.copy = function (e, t, n, r) {
            if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n)return 0;
            if (0 === e.length || 0 === this.length)return 0;
            if (t < 0)throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)throw new RangeError("sourceStart out of bounds");
            if (r < 0)throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
            var o, a = r - n;
            if (this === e && n < t && t < r)for (o = a - 1; o >= 0; --o)e[o + t] = this[o + n]; else if (a < 1e3 || !i.TYPED_ARRAY_SUPPORT)for (o = 0; o < a; ++o)e[o + t] = this[o + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, n + a), t);
            return a
        }, i.prototype.fill = function (e, t, n, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
                    var o = e.charCodeAt(0);
                    o < 256 && (e = o)
                }
                if (void 0 !== r && "string" != typeof r)throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !i.isEncoding(r))throw new TypeError("Unknown encoding: " + r)
            } else"number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n)throw new RangeError("Out of range index");
            if (n <= t)return this;
            t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0);
            var a;
            if ("number" == typeof e)for (a = t; a < n; ++a)this[a] = e; else {
                var s = i.isBuffer(e) ? e : K(new i(e, r).toString()), l = s.length;
                for (a = 0; a < n - t; ++a)this[a + t] = s[a % l]
            }
            return this
        };
        var te = /[^+\/0-9A-Za-z-_]/g
    }).call(exports, function () {
        return this
    }())
}, function (e, exports) {
    "use strict";
    function t(e) {
        var t = e.length;
        if (t % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
    }

    function n(e) {
        return 3 * e.length / 4 - t(e)
    }

    function r(e) {
        var n, r, o, i, a, s, h = e.length;
        a = t(e), s = new c(3 * h / 4 - a), o = a > 0 ? h - 4 : h;
        var d = 0;
        for (n = 0, r = 0; n < o; n += 4, r += 3)i = l[e.charCodeAt(n)] << 18 | l[e.charCodeAt(n + 1)] << 12 | l[e.charCodeAt(n + 2)] << 6 | l[e.charCodeAt(n + 3)], s[d++] = i >> 16 & 255, s[d++] = i >> 8 & 255, s[d++] = 255 & i;
        return 2 === a ? (i = l[e.charCodeAt(n)] << 2 | l[e.charCodeAt(n + 1)] >> 4, s[d++] = 255 & i) : 1 === a && (i = l[e.charCodeAt(n)] << 10 | l[e.charCodeAt(n + 1)] << 4 | l[e.charCodeAt(n + 2)] >> 2, s[d++] = i >> 8 & 255, s[d++] = 255 & i), s
    }

    function o(e) {
        return s[e >> 18 & 63] + s[e >> 12 & 63] + s[e >> 6 & 63] + s[63 & e]
    }

    function i(e, t, n) {
        for (var r, i = [], a = t; a < n; a += 3)r = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2], i.push(o(r));
        return i.join("")
    }

    function a(e) {
        for (var t, n = e.length, r = n % 3, o = "", a = [], l = 16383, c = 0, h = n - r; c < h; c += l)a.push(i(e, c, c + l > h ? h : c + l));
        return 1 === r ? (t = e[n - 1], o += s[t >> 2], o += s[t << 4 & 63], o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o += s[t >> 10], o += s[t >> 4 & 63], o += s[t << 2 & 63], o += "="), a.push(o), a.join("")
    }

    exports.byteLength = n, exports.toByteArray = r, exports.fromByteArray = a;
    for (var s = [], l = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = 0, u = h.length; d < u; ++d)s[d] = h[d], l[h.charCodeAt(d)] = d;
    l["-".charCodeAt(0)] = 62, l["_".charCodeAt(0)] = 63
}, function (e, exports) {
    exports.read = function (e, t, n, r, o) {
        var i, a, s = 8 * o - r - 1, l = (1 << s) - 1, c = l >> 1, h = -7, d = n ? o - 1 : 0, u = n ? -1 : 1,
            f = e[t + d];
        for (d += u, i = f & (1 << -h) - 1, f >>= -h, h += s; h > 0; i = 256 * i + e[t + d], d += u, h -= 8);
        for (a = i & (1 << -h) - 1, i >>= -h, h += r; h > 0; a = 256 * a + e[t + d], d += u, h -= 8);
        if (0 === i) i = 1 - c; else {
            if (i === l)return a ? NaN : (f ? -1 : 1) * (1 / 0);
            a += Math.pow(2, r), i -= c
        }
        return (f ? -1 : 1) * a * Math.pow(2, i - r)
    }, exports.write = function (e, t, n, r, o, i) {
        var a, s, l, c = 8 * i - o - 1, h = (1 << c) - 1, d = h >> 1,
            u = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = r ? 0 : i - 1, g = r ? 1 : -1,
            m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = h) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), t += a + d >= 1 ? u / l : u * Math.pow(2, 1 - d), t * l >= 2 && (a++, l /= 2), a + d >= h ? (s = 0, a = h) : a + d >= 1 ? (s = (t * l - 1) * Math.pow(2, o), a += d) : (s = t * Math.pow(2, d - 1) * Math.pow(2, o), a = 0)); o >= 8; e[n + f] = 255 & s, f += g, s /= 256, o -= 8);
        for (a = a << o | s, c += o; c > 0; e[n + f] = 255 & a, f += g, a /= 256, c -= 8);
        e[n + f - g] |= 128 * m
    }
}, function (e, exports) {
    var t = {}.toString;
    e.exports = Array.isArray || function (e) {
            return "[object Array]" == t.call(e)
        }
}]);