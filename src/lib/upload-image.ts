import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirebaseStorage } from '@/app/auth/firebase'

export async function uploadNomineeImage(
  file: File,
  nomineeName: string,
): Promise<string> {
  try {
    // Validate file
    if (!file) {
      throw new Error('Nenhum arquivo fornecido')
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('A imagem deve ter no máximo 5MB')
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      throw new Error('O arquivo deve ser uma imagem')
    }

    console.log('📋 File details:', {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type,
    })

    const storage = getFirebaseStorage()

    // Create a unique filename
    const timestamp = Date.now()
    const sanitizedName = nomineeName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const fileExtension = file.name.split('.').pop()
    const fileName = `nominees/${sanitizedName}-${timestamp}.${fileExtension}`

    console.log(`📤 Uploading image: ${fileName}`)
    console.log(`🗂️  Storage bucket: ${storage.app.options.storageBucket}`)

    // Create storage reference
    const storageRef = ref(storage, fileName)

    console.log('📍 Storage ref path:', storageRef.fullPath)
    console.log('🌐 Storage ref bucket:', storageRef.bucket)

    // Upload file
    console.log('⏳ Starting upload...')
    const uploadResult = await uploadBytes(storageRef, file)

    console.log('✅ Upload complete:', {
      fullPath: uploadResult.ref.fullPath,
      bucket: uploadResult.ref.bucket,
    })

    // Get download URL
    console.log('🔗 Getting download URL...')
    const downloadURL = await getDownloadURL(storageRef)

    console.log('✨ Download URL obtained:', downloadURL)

    return downloadURL
  } catch (error) {
    console.error('❌ Error uploading image:', error)
    throw error
  }
}
