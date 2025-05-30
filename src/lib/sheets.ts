import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getGoogleSheetsAuth() {
  // You'll need to set up these environment variables
  // with your Google Cloud service account credentials
  const credentials = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  })

  return auth
}

export async function addContactToSheet(data: {
  name: string
  company: string
  email: string
  phone?: string
  inquiryType: string
  message: string
}) {
  try {
    const auth = getGoogleSheetsAuth()
    const sheets = google.sheets({ version: 'v4', auth })
    
    const spreadsheetId = process.env.GOOGLE_SHEETS_CONTACT_ID
    if (!spreadsheetId) {
      throw new Error('Google Sheets ID for contact form not configured')
    }

    const timestamp = new Date().toLocaleString('ja-JP')
    const values = [
      [
        timestamp,
        data.name,
        data.company,
        data.email,
        data.phone || '',
        data.inquiryType,
        data.message,
        'Pending' // Status column
      ]
    ]

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Contact!A:H', // Adjust sheet name and range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    })

    return { 
      success: true, 
      rowId: `contact-${Date.now()}`,
      spreadsheetId,
      range: result.data.updates?.updatedRange 
    }
  } catch (error) {
    console.error('Google Sheets contact insertion failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function addDiagnosisToSheet(data: {
  name: string
  email: string
  tel?: string
  task: string
  details: string
}) {
  try {
    const auth = getGoogleSheetsAuth()
    const sheets = google.sheets({ version: 'v4', auth })
    
    const spreadsheetId = process.env.GOOGLE_SHEETS_DIAGNOSIS_ID || process.env.GOOGLE_SHEETS_CONTACT_ID
    if (!spreadsheetId) {
      throw new Error('Google Sheets ID for diagnosis form not configured')
    }

    const timestamp = new Date().toLocaleString('ja-JP')
    const values = [
      [
        timestamp,
        data.name,
        data.email,
        data.tel || '',
        data.task,
        data.details,
        'Pending' // Status column
      ]
    ]

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Diagnosis!A:G', // Adjust sheet name and range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    })

    return { 
      success: true, 
      rowId: `diagnosis-${Date.now()}`,
      spreadsheetId,
      range: result.data.updates?.updatedRange 
    }
  } catch (error) {
    console.error('Google Sheets diagnosis insertion failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}