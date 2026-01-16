# State Machine Diagrams

This document contains state machine diagrams for the key components in the garage door builder application.

## 1. Builder Store State Machine

The main Zustand store manages all builder selections and AI preview state.

```mermaid
stateDiagram-v2
    [*] --> Initialized
    
    state Initialized {
        [*] --> DefaultValues
        DefaultValues: widthFeet=8, widthInches=0<br/>heightFeet=7, heightInches=0<br/>designCollection="Traditional"<br/>designStyle="Raised Panel"<br/>designColor="White"<br/>trackSpringType="Torsion"<br/>trackLiftType="Standard Lift"<br/>trackWindLoad="None"<br/>extrasWindows="No Windows"<br/>extrasInsulation="None"<br/>extrasHardware="None"<br/>aiPreviewEnabled=true<br/>aiPreviewB64=null<br/>aiPreviewRequestedKey=null<br/>aiPreviewGeneratedKeys={}
    }
    
    Initialized --> Configuring: User makes selections
    Configuring --> Configuring: setWidth/setHeight<br/>setDesignCollection/setStyle/setColor<br/>setTrackSpringType/setLiftType/setWindLoad<br/>setExtrasWindows/setInsulation/setHardware
    
    Configuring --> Reset: reset() called
    Reset --> Initialized
    
    Configuring --> AIPreviewRequested: requestAIPreviewFor(key)
    AIPreviewRequested: aiPreviewRequestedKey = key<br/>if key not in aiPreviewGeneratedKeys
    
    AIPreviewRequested --> AIPreviewGenerating: commitAIPreview(key, b64)
    AIPreviewGenerating: aiPreviewB64 = b64<br/>aiPreviewLastKey = key<br/>aiPreviewGeneratedKeys[key] = true<br/>aiPreviewRequestedKey = null
    
    AIPreviewGenerating --> Configuring: Preview committed
    AIPreviewRequested --> Configuring: Key already generated (no-op)
    
    Configuring --> [*]
```

## 2. AI Preview Generation State Machine

The AI preview generation flow within the DesignPreview component.

```mermaid
stateDiagram-v2
    [*] --> Idle
    
    Idle: aiPreviewEnabled = true<br/>aiPreviewRequestedKey = null<br/>aiPreviewB64 = null<br/>error = null
    
    Idle --> CheckingConditions: aiPreviewRequestedKey changes
    
    CheckingConditions --> Idle: !aiPreviewEnabled OR<br/>!aiPreviewRequestedKey
    
    CheckingConditions --> Requesting: aiPreviewEnabled AND<br/>aiPreviewRequestedKey exists
    
    Requesting: setError(null)<br/>POST /api/ai-preview<br/>with all selections
    
    Requesting --> Success: response.ok AND data.b64 exists
    Requesting --> Error: !response.ok OR<br/>no data.b64
    
    Success: commitAIPreview(key, b64)<br/>aiPreviewB64 = b64<br/>aiPreviewRequestedKey = null
    
    Error: setError("Preview generation failed")<br/>aiPreviewRequestedKey = null<br/>console.error(err)
    
    Success --> Idle: Preview committed
    Error --> Idle: Error cleared
    
    Idle --> [*]
```

## 3. Builder Navigation Flow State Machine

The step-by-step navigation through the builder process.

```mermaid
stateDiagram-v2
    [*] --> Home
    
    Home --> SetupSize: redirect("/door-builder")
    
    state SetupSize {
        [*] --> EnteringDimensions
        EnteringDimensions: Select width (feet/inches)<br/>Select height (feet/inches)
        EnteringDimensions --> DimensionsSet: setWidth() / setHeight()
        DimensionsSet --> ContinueToDesign: Click Continue<br/>requestAIPreviewFor("setup:size")
    }
    
    SetupSize --> DesignCollection: router.push("/door-builder/design")
    
    state DesignCollection {
        [*] --> SelectingCollection
        SelectingCollection: Select collection<br/>(Traditional/Modern/Carriage House)
        SelectingCollection --> CollectionSet: setDesignCollection()
        CollectionSet --> ContinueToStyle: Click Continue<br/>requestAIPreviewFor("design:collection")
    }
    
    DesignCollection --> DesignStyle: router.push("/door-builder/design/style")
    
    state DesignStyle {
        [*] --> SelectingStyle
        SelectingStyle: Select style<br/>(Raised Panel/Flush/Grooved)
        SelectingStyle --> StyleSet: setDesignStyle()
        StyleSet --> ContinueToColor: Click Continue<br/>requestAIPreviewFor("design:style")
    }
    
    DesignStyle --> DesignColor: router.push("/door-builder/design/color")
    
    state DesignColor {
        [*] --> SelectingColor
        SelectingColor: Select color<br/>(White/Almond/Black)
        SelectingColor --> ColorSet: setDesignColor()
        ColorSet --> ContinueToTrack: Click Continue<br/>requestAIPreviewFor("design:color")
    }
    
    DesignColor --> TrackSprings: router.push("/door-builder/track-options/springs")
    
    state TrackSprings {
        [*] --> SelectingSprings
        SelectingSprings: Select spring type<br/>(Torsion/Extension)
        SelectingSprings --> SpringsSet: setTrackSpringType()
        SpringsSet --> ContinueToLift: Click Continue<br/>requestAIPreviewFor("track:springs")
    }
    
    TrackSprings --> TrackLift: router.push("/door-builder/track-options/lift")
    
    state TrackLift {
        [*] --> SelectingLift
        SelectingLift: Select lift type<br/>(Standard Lift/High Lift)
        SelectingLift --> LiftSet: setTrackLiftType()
        LiftSet --> ContinueToWindload: Click Continue<br/>requestAIPreviewFor("track:lift")
    }
    
    TrackLift --> TrackWindload: router.push("/door-builder/track-options/windload")
    
    state TrackWindload {
        [*] --> SelectingWindload
        SelectingWindload: Select wind load<br/>(None/Wind Reinforced)
        SelectingWindload --> WindloadSet: setTrackWindLoad()
        WindloadSet --> ContinueToExtras: Click Continue<br/>requestAIPreviewFor("track:windload")
    }
    
    TrackWindload --> ExtrasWindows: router.push("/door-builder/extras/windows")
    
    state ExtrasWindows {
        [*] --> SelectingWindows
        SelectingWindows: Select windows<br/>(No Windows/Top Panel/Full View)
        SelectingWindows --> WindowsSet: setExtrasWindows()
        WindowsSet --> ContinueToInsulation: Click Continue<br/>requestAIPreviewFor("extras:windows")
    }
    
    ExtrasWindows --> ExtrasInsulation: router.push("/door-builder/extras/insulation")
    
    state ExtrasInsulation {
        [*] --> SelectingInsulation
        SelectingInsulation: Select insulation<br/>(None/Polystyrene/Polyurethane)
        SelectingInsulation --> InsulationSet: setExtrasInsulation()
        InsulationSet --> ContinueToHardware: Click Continue<br/>requestAIPreviewFor("extras:insulation")
    }
    
    ExtrasInsulation --> ExtrasHardware: router.push("/door-builder/extras/hardware")
    
    state ExtrasHardware {
        [*] --> SelectingHardware
        SelectingHardware: Select hardware<br/>(None/Black/Bronze)
        SelectingHardware --> HardwareSet: setExtrasHardware()
        HardwareSet --> ContinueToSummary: Click Continue<br/>requestAIPreviewFor("extras:hardware")
    }
    
    ExtrasHardware --> Summary: router.push("/door-builder/summary")
    
    state Summary {
        [*] --> ReviewingSelections
        ReviewingSelections: Display all selections<br/>Size, Design, Track, Extras
        ReviewingSelections --> GetQuote: Click "Get Quote"
        ReviewingSelections --> EditSelections: Click "Edit Selections"<br/>router.push("/door-builder/setup/select-size")
    }
    
    Summary --> SetupSize: Edit Selections
    Summary --> [*]: Get Quote (future)
    
    note right of SetupSize
        Back button uses router.back()
        or fallback mapping
    end note
    
    note right of DesignCollection
        Back navigates to SetupSize
    end note
    
    note right of Summary
        Start Over button calls
        store.reset() and navigates
        to SetupSize
    end note
```

## 4. DesignPreview Component Rendering State Machine

The rendering states of the DesignPreview component based on AI preview availability.

```mermaid
stateDiagram-v2
    [*] --> Placeholder
    
    Placeholder: aiPreviewEnabled = true<br/>aiPreviewB64 = null<br/>Show text readout:<br/>- Size<br/>- Collection/Style/Color<br/>- Track options (if any)<br/>- Extras (if any)
    
    Placeholder --> Loading: aiPreviewRequestedKey set<br/>AND aiPreviewEnabled = true
    
    Loading: POST request in progress<br/>Show placeholder text<br/>error = null
    
    Loading --> Success: response.ok AND data.b64
    Loading --> Error: !response.ok OR<br/>no data.b64
    
    Success: aiPreviewB64 = b64<br/>Render <img> with base64 data URI<br/>Keep text readout below
    
    Error: error = "Preview generation failed"<br/>Show error message<br/>Clear aiPreviewRequestedKey<br/>Show placeholder text
    
    Success --> Placeholder: aiPreviewB64 cleared<br/>(on reset or new request)
    Error --> Placeholder: Error cleared<br/>New request initiated
    
    Placeholder --> Disabled: setAIPreviewEnabled(false)
    Disabled: aiPreviewEnabled = false<br/>Always show placeholder<br/>Never request preview
    
    Disabled --> Placeholder: setAIPreviewEnabled(true)
    
    Success --> [*]
    Placeholder --> [*]
```

## 5. Builder Shell Navigation State Machine

The back button navigation logic in BuilderShell component.

```mermaid
stateDiagram-v2
    [*] --> CheckHistory
    
    CheckHistory: pathname starts with<br/>"/door-builder"
    
    CheckHistory --> UseBrowserBack: window.history.length > 1
    CheckHistory --> UseFallback: window.history.length <= 1
    
    UseBrowserBack: router.back()
    UseFallback: Check fallback map
    
    state FallbackMap {
        [*] --> CheckPath
        CheckPath: Match pathname to map
        CheckPath --> DesignColor: "/door-builder/design/color"<br/>→ "/door-builder/design/style"
        CheckPath --> DesignStyle: "/door-builder/design/style"<br/>→ "/door-builder/design/collection"
        CheckPath --> DesignCollection: "/door-builder/design/collection"<br/>→ "/door-builder/setup/select-size"
        CheckPath --> Design: "/door-builder/design"<br/>→ "/door-builder/setup/select-size"
        CheckPath --> TrackWindload: "/door-builder/track-options/windload"<br/>→ "/door-builder/track-options/lift"
        CheckPath --> TrackLift: "/door-builder/track-options/lift"<br/>→ "/door-builder/track-options/springs"
        CheckPath --> TrackSprings: "/door-builder/track-options/springs"<br/>→ "/door-builder/design/color"
        CheckPath --> TrackOptions: "/door-builder/track-options"<br/>→ "/door-builder/design/color"
        CheckPath --> ExtrasHardware: "/door-builder/extras/hardware"<br/>→ "/door-builder/extras/insulation"
        CheckPath --> ExtrasInsulation: "/door-builder/extras/insulation"<br/>→ "/door-builder/extras/windows"
        CheckPath --> ExtrasWindows: "/door-builder/extras/windows"<br/>→ "/door-builder/track-options/windload"
        CheckPath --> Extras: "/door-builder/extras"<br/>→ "/door-builder/track-options/windload"
        CheckPath --> Summary: "/door-builder/summary"<br/>→ "/door-builder/extras/hardware"
        CheckPath --> Default: Pattern match<br/>"/door-builder/track-options/*"<br/>→ "/door-builder/design/color"
    }
    
    UseFallback --> FallbackMap
    FallbackMap --> Navigate: router.push(fallback)
    
    UseBrowserBack --> [*]
    Navigate --> [*]
    
    note right of CheckHistory
        Back button only shown
        when pathname starts
        with "/door-builder"
    end note
```

## 6. AI Preview Request Flow State Machine

The complete flow of requesting and generating AI previews across the builder steps.

```mermaid
stateDiagram-v2
    [*] --> NoPreview
    
    NoPreview: aiPreviewB64 = null<br/>aiPreviewRequestedKey = null<br/>aiPreviewGeneratedKeys = {}
    
    NoPreview --> CheckIfGenerated: User clicks Continue<br/>requestAIPreviewFor(key)
    
    CheckIfGenerated --> SkipRequest: key in aiPreviewGeneratedKeys
    CheckIfGenerated --> SetRequested: key NOT in aiPreviewGeneratedKeys
    
    SkipRequest: No-op<br/>Do not set aiPreviewRequestedKey
    SetRequested: aiPreviewRequestedKey = key
    
    SetRequested --> ComponentDetects: DesignPreview useEffect<br/>detects aiPreviewRequestedKey change
    
    ComponentDetects --> APIRequest: POST /api/ai-preview<br/>with all current selections
    
    APIRequest --> CacheCheck: API route checks cache
    CacheCheck --> ReturnCached: Cache hit<br/>(same selections within 10min)
    CacheCheck --> GenerateNew: Cache miss
    
    GenerateNew --> RateLimitCheck: Check IP rate limit
    RateLimitCheck --> RateLimited: > 10 requests/min
    RateLimitCheck --> CallOpenAI: <= 10 requests/min
    
    RateLimited: Return 429 error
    CallOpenAI: POST to OpenAI API<br/>model: "gpt-image-1-mini"<br/>size: "1536x1024"<br/>format: "png"
    
    CallOpenAI --> CacheResult: Store in cache<br/>TTL: 10 minutes
    CacheResult --> ReturnB64: Return { b64, prompt }
    ReturnCached --> ReturnB64
    
    ReturnB64 --> CommitPreview: commitAIPreview(key, b64)
    CommitPreview: aiPreviewB64 = b64<br/>aiPreviewLastKey = key<br/>aiPreviewGeneratedKeys[key] = true<br/>aiPreviewRequestedKey = null
    
    CommitPreview --> PreviewReady: Preview available
    
    APIRequest --> HandleError: Network error OR<br/>API error OR<br/>Rate limited
    HandleError: setError("Preview generation failed")<br/>aiPreviewRequestedKey = null
    
    HandleError --> NoPreview: Error cleared
    PreviewReady --> NoPreview: reset() called<br/>(Start Over)
    
    PreviewReady --> [*]
    NoPreview --> [*]
    
    note right of CheckIfGenerated
        Prevents duplicate requests
        for same step key
    end note
    
    note right of CacheCheck
        Cache key: SHA256 hash
        of request payload
    end note
```

## State Variables Summary

### Builder Store States
- **Dimensions**: `widthFeet`, `widthInches`, `heightFeet`, `heightInches`
- **Design**: `designCollection`, `designStyle`, `designColor`
- **Track Options**: `trackSpringType`, `trackLiftType`, `trackWindLoad`
- **Extras**: `extrasWindows`, `extrasInsulation`, `extrasHardware`
- **AI Preview**: `aiPreviewEnabled`, `aiPreviewB64`, `aiPreviewLastKey`, `aiPreviewRequestedKey`, `aiPreviewGeneratedKeys`

### Component States
- **DesignPreview**: `error` (local state)
- **BuilderShell**: `pathname` (from Next.js router)
- **Navigation**: Route-based state transitions

## Key State Transitions

1. **User Selection** → `set*()` action → Store updated → Component re-renders
2. **Continue Click** → `requestAIPreviewFor(key)` → `aiPreviewRequestedKey` set → `useEffect` triggers → API call → `commitAIPreview()` → Preview displayed
3. **Back Click** → `router.back()` or fallback → Previous route → State persists
4. **Start Over** → `reset()` → All states reset to defaults → Navigate to setup
