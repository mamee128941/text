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

  // 부산대 맞춤법 검사기 요청
  const fetchRes = await fetch('https://speller.cs.pusan.ac.kr/results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `text1=${encodeURIComponent(text)}`
  });

  const html = await fetchRes.text();
  res.status(200).json({ html });
}
