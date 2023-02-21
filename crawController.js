const crawServices = require("./crawServices");
const FPTcrawServices = require("./fpt_crawServices");
const mobiles = require("./mobile.json");
const laptops = require("./laptop.json");
const fs = require("fs");
const scrawController = async (browserInstance) => {
   const tddd = {
      dtdd: "https://www.thegioididong.com/dtdd#c=42&o=9&pi=1",
      laptop: "https://www.thegioididong.com/laptop#c=44&o=9&pi=1",
   };
   const fpt = "https://fptshop.com.vn/may-tinh-xach-tay";
   try {
      let browser = await browserInstance;
      // let page = await browser.newPage()
      // await page.goto("https://chiasenhac.vn/nhac-hot.html")

      // producst info
      // const products = await crawServices.crawProduct(browser, tddd["laptop"]);
      // fs.writeFile("products.json", JSON.stringify(products), (err) => {
      //    if (err) console.log("ghi data vao file that bai", err);
      // });

      // product links
      // const productLinks = await crawServices.crawProductLinks(
      //    browser,
      //    "https://www.thegioididong.com/dtdd"
      // );

      // products detail
      //  const indexs = [0,1]
      //  const selectedproductLinks = productLinks.filter((link, index) => indexs.some(i => i == index) )
      //  console.log(selectedproductLinks)
      // const productLinks = [
      //    { href: "https://www.thegioididong.com/dtdd/iphone-11" },
      //    { href: "https://www.thegioididong.com/dtdd/iphone-11" },
      // ];

      // const productsDetail = await crawServices.crawProductsDetail(
      //    browser,
      //    "https://www.thegioididong.com/dtdd/iphone-11",
      //    "galaxy-z-flip-4"
      // );
      let i = 1;
      let productDetails = [];
      for (let item of laptops) {
         // if (item.pre_order) continue;
         // if (item.href === "iphone-14-plus") continue;
         if (i >= 20) break;
         i++;
         console.log(">>> truy cap " + item.href);
         const detail = await crawServices.crawProductsDetail(
            browser,
            `https://www.thegioididong.com/laptop/${item.href}`,
            item.href
         );
         productDetails.push(detail);
      }
      // const detail = await crawServices.crawProductsDetail(
      //    browser,
      //    `https://www.thegioididong.com/dtdd/${item.href}`,
      //    item.key
      // );
      browser.close();
      console.log("dong trinh duyet");

      // console.log(products);

      // fs.writeFile("laptop.json", JSON.stringify(products), (err) => {
      //    if (err) console.log("ghi data vao file that bai", err);
      // });

      fs.writeFile(
         "laptop-detail.json",
         JSON.stringify(productDetails),
         (err) => {
            if (err) console.log("ghi data vao file that bai", err);
         }
      );

      // console.log(productDetails);
   } catch (error) {
      console.log(error);
      browser.close();
      console.log(">>> loi browser controller");
   }
};

module.exports = scrawController;
