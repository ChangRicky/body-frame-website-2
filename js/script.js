// js/script.js

// 取得需要操作的元素
const form = document.getElementById('frame-form');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const resultText = document.getElementById('result-text');
const demoContainer = document.getElementById('result-demo');
const demoImg = document.getElementById('demo-img');
const demoCaption = document.getElementById('demo-caption');

const suggestions = {
  '大骨架': {
    '版型剪裁': '結構性剪裁：肩線明顯西裝外套、直筒大衣；寬褲/A字裙；垂墜感材質',
    '色彩圖案': '深色系／暖色調；細條豎紋；同色系套裝',
    '面料質感': '中厚垂墜（羊毛呢、麂皮）；避免挺硬布料',
    '配件細節': '寬版腰帶、厚框墨鏡、寬沿帽、大型飾品',
    '比例層次': '單件大衣＋長褲；避免多層蓬鬆',
    '職場': '硬挺外套＋直筒褲；寬版腰帶、低跟鞋',
    '休閒': '寬鬆針織＋闊腿褲；厚底鞋、大托特包',
    '約會': '結構感洋裝＋短外套；短靴、手拿包',
    '運動': '寬鬆運動衫＋闊腿運動褲；運動鞋、棒球帽',
    '旅行': '寬鬆亞麻襯衫＋寬休閒褲；涼鞋、草帽'
  },
  '中等骨架': {
    '版型剪裁': '修身不貼身：微收腰襯衫、直筒褲、A字裙',
    '色彩圖案': '柔和中性色；細格紋、碎花；局部撞色',
    '面料質感': '中挺棉麻、絲光棉；皮革／輕薄針織拼接',
    '配件細節': '中寬腰帶、適中手袋、中型耳飾',
    '比例層次': '襯衫＋馬甲或西裝；突出腰線',
    '職場': '微收腰襯衫＋鉛筆裙；細皮帶、中跟鞋',
    '休閒': 'T-shirt＋輕襯衫＋直筒牛仔褲；運動鞋、小包',
    '約會': '微修身小禮服／A字裙；中跟鞋、肩背包',
    '運動': '合身背心＋緊身褲；輕便跑鞋、腰包',
    '旅行': '連帽薄外套＋高腰休閒褲；樂福鞋、後背包'
  },
  '小骨架': {
    '版型剪裁': '貼身強調：緊身上衣、洋裝；高腰長／短裙；荷葉邊細節',
    '色彩圖案': '亮淺色／對比色；大圖案；細條水平／對角紋',
    '面料質感': '輕薄柔軟（雪紡、絲質）；避免厚重',
    '配件細節': '細腰帶、小巧包、精緻小飾品',
    '比例層次': '多層薄材質；局部腰線中斷',
    '職場': '貼身襯衫＋鉛筆裙；細腰帶、細跟鞋',
    '休閒': '修身T-shirt＋窄管褲／短褲；帆布鞋、迷你包',
    '約會': '露肩緊身裙；高跟鞋、小肩包',
    '運動': '緊身背心＋中長緊身褲；輕薄跑鞋',
    '旅行': '短洋裝／短上衣＋高腰短裙；坡跟涼鞋、草編小包'
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();

  // 隐藏结果区与示意图区，显示 Loading GIF
  result.classList.add('hidden');
  demoContainer.classList.add('hidden');
  loading.classList.remove('hidden');

  // 模拟 1.5 秒加载
  setTimeout(() => {
    // 隐藏 Loading 区
    loading.classList.add('hidden');

    // 读取数值并判断骨架
    const h = Number(document.getElementById('height').value);
    const s = Number(document.getElementById('shoulder').value);
    const c = Number(document.getElementById('chest').value);
    const p = Number(document.getElementById('hip').value);
    const avg = (s + c + p) / 3;
    const range = Math.max(s, c, p) - Math.min(s, c, p);

    let frame;
    if (avg > h * 0.26 && range < h * 0.05) frame = '大骨架';
    else if (avg < h * 0.26 && range > h * 0.05) frame = '小骨架';
    else frame = '中等骨架';

    // 插入文字结果
    const data = suggestions[frame];
    let html = `<h2>判讀結果：${frame}</h2><ul>`;
    for (const key in data) {
      html += `<li><strong>${key}：</strong>${data[key]}</li>`;
    }
    html += '</ul>';
    resultText.innerHTML = html;

    // 设置对应示意图与 caption
    const demoMap = {
      '大骨架': 'assets/large-demo.png',
      '中等骨架': 'assets/medium-demo.png',
      '小骨架': 'assets/small-demo.png'
    };
    demoImg.src = demoMap[frame];
    demoImg.alt = frame + ' 示意圖';
    demoCaption.innerText = `${frame}範例圖`;

    // 渐入示意图区域
    demoContainer.classList.remove('hidden');
    demoContainer.style.opacity = '0';
    setTimeout(() => {
      demoContainer.style.opacity = '1';
    }, 50);

    // 最后显示结果区
    result.classList.remove('hidden');
  }, 1500);
});
