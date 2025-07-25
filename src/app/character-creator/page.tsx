'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { StepIndicator } from './components/StepIndicator'
import { AttributeRoller } from './components/AttributeRoller'
import { RaceSelector } from './components/RaceSelector'
import { OriginSelector } from './components/OriginSelector'
import { FaithSelector } from './components/FaithSelector'
import { EquipmentBrowser } from './components/EquipmentBrowser'
import { CharacterDetails } from './components/CharacterDetails'
import { CharacterSummary } from './components/CharacterSummary'
import { useCharacterCreation } from './hooks/useCharacterCreation'

const STEPS = [
  { id: 1, name: 'Attributes', description: 'Roll your core attributes' },
  { id: 2, name: 'Race', description: 'Choose your character race' },
  { id: 3, name: 'Origin', description: 'Select origin and backgrounds' },
  { id: 4, name: 'Faith', description: 'Choose divine allegiance' },
  { id: 5, name: 'Equipment', description: 'Select weapons and gear' },
  { id: 6, name: 'Details', description: 'Character name and description' },
  { id: 7, name: 'Review', description: 'Final character review' }
]

export default function CharacterCreatorPage() {
  const router = useRouter()
  const { user } = useUser()
  const {
    currentStep,
    attributes,
    startingZimes,
    race,
    origin,
    backgrounds,
    faith,
    covenant,
    equipment,
    details,
    errors,
    isValid,
    isSaving,
    generateAttributes,
    selectRace,
    selectOrigin,
    selectBackgrounds,
    selectFaith,
    selectEquipment,
    setDetails,
    saveCharacter,
    nextStep,
    prevStep,
    goToStep
  } = useCharacterCreation()

  const handleSaveCharacter = async () => {
    const characterId = await saveCharacter()
    if (characterId) {
      router.push(`/characters/${characterId}`)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AttributeRoller
            attributes={attributes}
            onAttributesGenerated={generateAttributes}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <RaceSelector
            attributes={attributes}
            selectedRace={race}
            onRaceSelected={selectRace}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <OriginSelector
            selectedOrigin={origin}
            selectedBackgrounds={backgrounds}
            onOriginSelected={selectOrigin}
            onBackgroundsSelected={selectBackgrounds}
            onNext={nextStep}
            onPrev={prevStep}
            errors={errors}
          />
        )
      case 4:
        return (
          <FaithSelector
            selectedFaith={faith}
            hasCovenant={covenant}
            onFaithSelected={selectFaith}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <EquipmentBrowser
            selectedEquipment={equipment}
            startingEquipment={backgrounds?.flatMap(bg => bg.startingEquipment) || []}
            startingZimes={startingZimes}
            onEquipmentSelected={selectEquipment}
            onNext={nextStep}
            onPrev={prevStep}
            errors={errors}
          />
        )
      case 6:
        return (
          <CharacterDetails
            characterDetails={details}
            onDetailsSet={setDetails}
            onNext={nextStep}
            onPrev={prevStep}
            errors={errors}
          />
        )
      case 7:
        return (
          <CharacterSummary
            character={{
              name: details.name,
              race,
              origin,
              backgrounds,
              faith,
              covenant,
              attributes,
              equipment,
              details
            }}
            onConfirm={handleSaveCharacter}
            onEdit={goToStep}
            onPrev={prevStep}
            isSaving={isSaving}
            isValid={isValid}
          />
        )
      default:
        return null
    }
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="text-white hover:text-purple-300 transition-colors mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-white">Character Creator</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user.firstName || 'Adventurer'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        </div>

        {/* Step Content */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  )
} 