"use server"

export default async function getSuggestion(input :string) {
    const url = `https://search.kongfz.com/common-web/v1/api/word/relate?query=${input}`
  
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        Cookie: process.env.KFZ_COOKIE || '',
      })
    }).then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
      return null
    })
    return res.data.suggestList
  }