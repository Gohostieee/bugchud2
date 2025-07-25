import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">BUGCHUD</h1>
          <p className="text-gray-300">Join the dark fantasy realm</p>
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-purple-600 hover:bg-purple-700 text-white',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-300',
                socialButtonsBlockButton: 
                  'border-purple-500/50 text-white hover:bg-purple-500/20',
                formFieldInput: 
                  'bg-gray-800/50 border-purple-500/30 text-white',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-purple-400 hover:text-purple-300',
                identityPreviewText: 'text-white',
                formButtonReset: 'text-purple-400 hover:text-purple-300'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 