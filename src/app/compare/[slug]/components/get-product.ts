import prisma from "@/lib/prisma";
import type { Product } from "@/types/product/product";
import { detailDangdang, searchDangDang } from "@/lib/crawler/dd";
import { searchJD } from "@/lib/crawler/jd";
import { detailKongfuzi, searchKongfuzi } from "@/lib/crawler/kfz";


export default async function getProducts(name : string) {
    // const DDProducts = await searchDangDang(name)
    // const JDProducts = await searchJD(name)
    // const products = await searchKongfuzi(name)

    // const products = DDProducts.concat(JDProducts)
    
    // await prisma.$transaction(
    //   products.map((product) =>
    //     prisma.product.upsert({
    //       where: { identifier: product.identifier },
    //       update: {
    //         price: product.price,
    //       },
    //       create: product,
    //     })
    //   )
    // )

    // await prisma.priceHistory.createMany({
    //   data: products.map((product) => ({
    //     price: product.price,
    //     pIdentifier: product.identifier,
    //   })),
    // })

    // return products


    // detailDangdang('29467852')
    return [
      {
        name: '计算机体系结构：量化研究方法（第6版） 计算机体系结构领域权奠基作品，2017年图灵奖得主力作，美国教材和学术著作者协会',
        price: '157.80',
        shop: '',
        description: '1. 计算机体系结构领域奠基作品， 20多年来久负盛名 2. 2017年图灵奖得主John L. Hennessy与David A. Patterson作品 3. 斩获2019年美国教材和学术著作者协会 优秀教科书奖 ，全球高校计算机体系结构课程参考书 4. 计算机科学、电子工程、自动化工程等专业学生教材，计算机设计相关行业工程师和架构师手册 5. 第6版对内容做了较大修订，新增 领域专用体系结构 ，并将书中使用的指令集体系结构更新为RISC-V',
        image: 'https://img3m2.ddimg.cn/7/16/29467852-1_b_1727162124.jpg',
        url: 'https://product.dangdang.com/29467852.html',
        platform: '当当',
        identifier: 'dd29467852',
        category: []
      },
      {
        name: '计算机体系结构（第2版）',
        price: '43.80',
        shop: '',
        description: '',
        image: 'https://img3m2.ddimg.cn/30/4/29472132-1_b_1.jpg',
        url: 'https://product.dangdang.com/29472132.html',
        platform: '当当',
        identifier: 'dd29472132',
        category: []
      },
      {
        name: '计算机体系结构 量化研究方法(第6版) 人民邮电出版社 新华书店正版，关注店铺成为会员可享店铺专属优惠，团购客户请咨询在线客服！',
        price: '163.80',
        shop: '文轩网旗舰店',
        description: '1. 计算机体系结构领域奠基作品， 20多年来久负盛名2. 2017年图灵奖得主John L. Hennessy与David A. Patterson作品3. 斩获2019年美国教材和学术著作者协会“优秀教科书奖”，全球高校计算机体系结构课程参考书4. 计算机科学、电子工程、自动化工程等专业学生教材，计算机设计相关行业工程师和架构师手册5. 第6版对内容做了较大修订，新增“领域专用体系结构”，并将书中使用的指令集体系结构更新为RISC-V',
        image: 'https://img3m7.ddimg.cn/4/11/11273756377-1_b_1728378493.jpg',
        url: 'https://product.dangdang.com/11273756377.html',
        platform: '当当',
        identifier: 'dd11273756377',
        category: []
      },
      {
        name: '计算机体系结构 「本店部分图书为稀缺古旧书籍，您下单之前可与在线客服联系」',
        price: '45.40',
        shop: '烟雨江南图书专营店',
        description: '本书是胡伟武老师2011年在清华大学出版社出版的《计算机体系结构》一书的新版。本书是从事微处理器设计的一线科研人员撰写的教材，充分结合了作者从事龙芯处理器研制的科研结晶和体会。中科院计算所胡伟武研究员是我国自主通用龙芯CPU的总设计师，在处理器设计方面具有丰富的理论知识和工程经验。本书具有两个鲜明的特点： 内容精练而实用，表述清楚而易懂。本书适合作为高等学校计算机专业的高年级本科生、研究生的教材，也可以作为相关工程技术人员的学习参考书。',
        image: 'https://img3m8.ddimg.cn/92/23/11820161918-1_b_1725649664.jpg',
        url: 'https://product.dangdang.com/11820161918.html',
        platform: '当当',
        identifier: 'dd11820161918',
        category: []
      },
      {
        name: '计算机体系结构实验教程(中央民族大学计算机体系结构实验教材)',
        price: '14.74',
        shop: '博库图书专营店',
        description: '',
        image: 'https://img3m7.ddimg.cn/58/20/11350435297-1_b_1.jpg',
        url: 'https://product.dangdang.com/11350435297.html',
        platform: '当当',
        identifier: 'dd11350435297',
        category: []
      },
      {
        name: '计算机体系结构实验教程',
        price: '15.10',
        shop: '',
        description: '',
        image: 'https://img3m6.ddimg.cn/34/7/27380266-1_b_2.jpg',
        url: 'https://product.dangdang.com/27380266.html',
        platform: '当当',
        identifier: 'dd27380266',
        category: []
      },
      {
        name: '计算机体系结构实验教程(中央民族大学计算机体系结构实验教材)【新华全新书籍正版】 电子发票 多仓就近发货 85%城市次日达！',
        price: '10.60',
        shop: '辽宁出版集团图书专营店',
        description: '',
        image: 'https://img3m9.ddimg.cn/35/21/11544064919-1_b_1695363744.jpg',
        url: 'https://product.dangdang.com/11544064919.html',
        platform: '当当',
        identifier: 'dd11544064919',
        category: []
      },
      {
        name: '计算机体系结构（第2版）',
        price: '37.30',
        shop: '北京旷氏文豪图书专营店',
        description: '',
        image: 'https://img3m9.ddimg.cn/33/16/1492136349-1_b_1726499602.jpg',
        url: 'https://product.dangdang.com/1492136349.html',
        platform: '当当',
        identifier: 'dd1492136349',
        category: []
      },
      {
        name: '预售 预计10月下旬发货 计算机体系结构：量化研究方法（第6版）',
        price: '139.80',
        shop: '人民邮电出版社官方旗舰店',
        description: '',
        image: 'https://img3m4.ddimg.cn/10/19/11273789944-1_b_2.jpg',
        url: 'https://product.dangdang.com/11273789944.html',
        platform: '当当',
        identifier: 'dd11273789944',
        category: []
      },
      {
        name: '计算机体系结构 胡伟武,汪文祥,吴瑞阳,陈云霁,肖俊华,章隆兵 清华大学出版社【可开电子发票】 正版图书，下单前请先咨询客服，欢迎选购！',
        price: '59.47',
        shop: '墨语图书专营店',
        description: '本书是胡伟武老师2011年在清华出版社出版的《计算机体系结构》一书的新版。本书是从事微处理器设计的一线科研人员撰写的，充分结合了作者从事龙芯处理器研制的科研结晶和体会。中科院计算所胡伟武研究员是我国自主通用龙芯CPU的总设计师，在处理器设计方面具有丰富的理论知识和工程经验。本书具有两个鲜明的特点： 内容精练而实用，表述清楚而易懂。本书适合作为高等学校计算机专业的高年级本科生、研究生的，也可以作为相关工程技术人员的学习参考书。',
        image: 'https://img3m0.ddimg.cn/6/27/11737866300-1_b_1713035686.jpg',
        url: 'https://product.dangdang.com/11737866300.html',
        platform: '当当',
        identifier: 'dd11737866300',
        category: []
      },
      {
        name: '计算机体系结构：量化研究方法（第6版）（体系结构领域经典，图灵奖得主扛鼎之作！）（图灵出品）',
        price: '133.80',
        shop: '人民邮电出版社京东自营官方旗舰店',
        description: '计算机体系结构领域奠基作品，2017年图灵奖得主力作，美国教材和学术著作者协会“优秀教科书奖”获奖图书，全球多所高校计算机体系结构课程参考书 搜【图书企业购】享特权，团购专线400-026-0000',
        image: 'https://img13.360buyimg.com/n7/jfs/t1/188107/39/30836/86173/636e737eE3b20d7ac/a2876bb3f58985c3.jpg.avif',
        url: 'https://item.jd.com/13427803.html',
        platform: '京东',
        identifier: 'jd13427803',
        category: []
      },
      {
        name: '计算机体系结构 量化研究方法(第6版) 图书',
        price: '95.90',
        shop: '文轩网旗舰店',
        description: '新华书店，正版保证，关注店铺成为会员可享店铺专属优惠，团购客户请咨询在线客服！',
        image: 'https://img12.360buyimg.com/n7/jfs/t1/200268/26/47042/96960/672898ebFec38f326/1d8eadd34ee2a527.jpg.avif',
        url: 'https://item.jd.com/10061684630757.html',
        platform: '京东',
        identifier: 'jd10061684630757',
        category: []
      },
      {
        name: '计算机体系结构：量化研究方法（第6版）',
        price: '118.30',
        shop: '上海世纪出版官方旗舰店',
        description: '',
        image: 'https://img10.360buyimg.com/n7/jfs/t1/162695/13/51959/122066/672e0011F66de6ec9/9fbcbd86f9e3b638.jpg.avif',
        url: 'https://item.jd.com/10092308417215.html',
        platform: '京东',
        identifier: 'jd10092308417215',
        category: []
      },
      {
        name: '计算机体系结构：量化研究方法（英文版·原书第6版）',
        price: '193.60',
        shop: '机械工业出版社京东自营官方旗舰店',
        description: '图灵奖得主经典之作，在摩尔定律失效之日预言计算机体系结构的重生！新版采用RISC-V，新增特定领域体系结构 100册以上批量采购专线400-026-0000',
        image: 'https://img14.360buyimg.com/n7/jfs/t1/56686/40/6298/124876/5d3fa254E9f45d57b/59205ad70d770a04.jpg.avif',
        url: 'https://item.jd.com/12553439.html',
        platform: '京东',
        identifier: 'jd12553439',
        category: []
      },
      {
        name: '数字设计和计算机体系结构（原书第2版）',
        price: '49.84',
        shop: '机械工业出版社京东自营官方旗舰店',
        description: '将数字逻辑和计算机体系结构融合，反映了当前数字电路设计的主流方法，并突出计算机体系结构的工程特点，大量示例及习题。 搜【图书企业购】享特权，团购专线400-026-0000',
        image: 'https://img10.360buyimg.com/n7/jfs/t2893/96/489239543/83509/b0432692/57174f20N23a9b349.jpg.avif',
        url: 'https://item.jd.com/11914000.html',
        platform: '京东',
        identifier: 'jd11914000',
        category: []
      },
      {
        name: '计算机组成与体系结构（原书第4版）',
        price: '66.24',
        shop: '机械工业出版社京东自营官方旗舰店',
        description: '多次获得美国教材和学术著作者协会颁发的“优*教材奖”的畅销教材。 京东APP搜【图书企业购】享采购特权，批量采购专线400-026-0000',
        image: 'https://img11.360buyimg.com/n7/jfs/t1/29839/29/10772/153336/5c8a0f3aE8d14d516/cb3162a074ba102f.jpg.avif',
        url: 'https://item.jd.com/12562776.html',
        platform: '京东',
        identifier: 'jd12562776',
        category: []
      },
      {
        name: '计算机体系结构：量化研究方法（第6版） 图灵计算机科学丛书 约翰·L.亨尼西，大卫·A.帕特森 著 人民邮电出版社',
        price: '149.90',
        shop: '芝麻开门图书专营店',
        description: '',
        image: 'https://img12.360buyimg.com/n7/jfs/t1/63430/20/21924/85635/6333e779E83459e5f/69e32603974ecdb7.png.avif',
        url: 'https://item.jd.com/69672094797.html',
        platform: '京东',
        identifier: 'jd69672094797',
        category: []
      },
      {
        name: '【用过的书 有笔迹】 计算机体系结构 第2版 王志英,张春元,沈立,肖晓强,姜晶菲 著 清华大学出版',
        price: '6.58',
        shop: '当康图书专营店',
        description: '',
        image: 'https://img11.360buyimg.com/n7/jfs/t1/233331/28/24689/83138/66fb57baF43fd0440/adb9aa05cddb2241.jpg.avif',
        url: 'https://item.jd.com/10118909867166.html',
        platform: '京东',
        identifier: 'jd10118909867166',
        category: []
      },
      {
        name: '计算机体系结构（第2版）',
        price: '53.10',
        shop: '京东图书自营官方旗舰店',
        description: '首届全国优秀教材（高等教育类）一等奖',
        image: 'https://img11.360buyimg.com/n7/jfs/t1/195952/39/45372/37467/665b56edF7094643f/d77ef2d4739f826e.jpg.avif',
        url: 'https://item.jd.com/13454996.html',
        platform: '京东',
        identifier: 'jd13454996',
        category: []
      },
      {
        name: '计算机体系结构与SoC设计（附微课视频）',
        price: '55.00',
        shop: '人民邮电出版社京东自营官方旗舰店',
        description: '',
        image: 'https://img10.360buyimg.com/n7/jfs/t1/128213/16/33122/112735/636b1444E884f3900/4cfb49374e5517c2.jpg.avif',
        url: 'https://item.jd.com/13512995.html',
        platform: '京东',
        identifier: 'jd13512995',
        category: []
      }
    ]

}