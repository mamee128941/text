export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Only POST allowed' });
      return;
    }
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'No text provided' });
      return;
    }
  
    // 네이버 맞춤법 검사기 요청 (헤더 추가)
    const fetchRes = await fetch('https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://m.search.naver.com/'
      },
      body: `q=${encodeURIComponent(text)}&where=nexearch&color_blindness=0`
    });
  
    const data = await fetchRes.json();
    res.status(200).json(data);
  }
