# InfiniteScroll
## Infinite Scroll 是利用unsplash api loading 指定collections的圖片，並使其在網頁上進行無限的loading

# 使用的工具
>unsplash API : https://unsplash.com/developers
>loading.io : https://loading.io/
>HeroPattern: https://heropatterns.com/

# 工作方法
**1.製作loading spiner**
- 從[loading.io](https://loading.io/)中製作客製化的loading spin, 並儲存為animated - svg file
- 在index.html中導入loading spiner svg
- 於css中設定樣式，包含設定loading時形成白色透明的背景色覆蓋於原網頁上，置中loading spiner

**設定網頁HTML架構及CSS切版**
- 字形使用google font中的Rubik, 於body中設定全版的字形
- body中掛入背景圖片, 圖片來源取自[HeroPattern](https://heropatterns.com/)設定客製化背景圖案
- infinite scroll 中的圖片透過 flex box 排列，將圖片於電腦瀏覽時形成三排圖片排列瀏覽, 並以media Query設定於手機瀏覽時形成一直列全版瀏覽

**設定JS fetch api以及 infinity scroll**
- 以async fc 取得unsplash上指定collection的圖片
- 以 fotEach迴圈 新增<a>以及<img>element 將撈取的圖片相關數據存入相關屬性中
- 使用到的DOM method : getElementById, createElement
- 使用到的Node method : appendChild
- 使用到的Eelement method : setAttribute
    >為了簡化重複使用setAttribute，創建setAttributes fc讓coding command更乾淨

