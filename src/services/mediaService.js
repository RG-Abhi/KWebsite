import { getToken } from './authService'

export async function listMedia() {
  const res = await fetch('/api/media')
  if (!res.ok) throw new Error('Failed to load media')
  const data = await res.json()
  return data.assets || []
}

export async function uploadMedia(file, onProgress) {
  const form = new FormData()
  form.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/media/upload')
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300) resolve(body.asset)
        else reject(new Error(body.message || 'Upload failed'))
      } catch {
        reject(new Error('Upload failed'))
      }
    }

    xhr.onerror = () => reject(new Error('Upload failed'))
    xhr.send(form)
  })
}

export async function deleteMedia(id) {
  const res = await fetch(`/api/media/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || 'Delete failed')
  }
}

export async function replaceMedia(id, file, onProgress) {
  const form = new FormData()
  form.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `/api/media/replace/${id}`)
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300) resolve(body.asset)
        else reject(new Error(body.message || 'Replacement failed'))
      } catch {
        reject(new Error('Replacement failed'))
      }
    }

    xhr.onerror = () => reject(new Error('Replacement failed'))
    xhr.send(form)
  })
}

