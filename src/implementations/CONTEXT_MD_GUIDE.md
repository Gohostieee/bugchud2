# Context MD File Creation Guide 📋

## Purpose of Context Files

Context MD files are **technical implementation documentation** that capture the detailed inner workings of a folder's code. While `AI.md` files explain the "why" and "vibe", **Context MD files explain the "what" and "how"**.

## Context.md vs AI.md - Key Differences

| Context.md | AI.md |
|------------|-------|
| Technical implementation details | Purpose and philosophy |
| Functions, types, classes | Folder organization and goals |
| Code relationships and dependencies | Project vision and next steps |
| Usage patterns and examples | Vibe check and collaboration notes |
| Implementation specifics | High-level context for contributors |

## What MUST Be Included

### 1. **All Functions & Methods** 📋
```markdown
### `functionName(param1: Type, param2: Type): ReturnType`
**Purpose**: Clear one-line description of what it does
**Implementation**: How it accomplishes its task
**Usage**: When and how to call it
**Dependencies**: What it relies on
**Side Effects**: Any state changes or external impacts
```

### 2. **All Types & Interfaces** 🏗️
```markdown
### `TypeName`
**Purpose**: What this type represents
**Properties**: 
- `propertyName: Type` - What this property stores/represents
**Usage Context**: Where and how this type is used
**Validation Rules**: Any constraints or validation logic
```

### 3. **Classes & Components** ⚙️
```markdown
### `ClassName`
**Purpose**: What this class encapsulates
**Key Methods**: Brief overview of main methods
**State Management**: How internal state is handled
**Lifecycle**: Creation, update, and cleanup patterns
**Usage Pattern**: Typical instantiation and usage
```

### 4. **Constants & Configuration** 🔧
```markdown
### `CONSTANT_NAME`
**Value**: The actual value
**Purpose**: Why this constant exists
**Usage**: Where it's referenced
**Modification Guidelines**: When/how it should be changed
```

### 5. **Relationships & Dependencies** 🔗
```markdown
## Internal Dependencies
- File relationships within the folder
- How components interact with each other
- Data flow patterns

## External Dependencies
- Imports from other folders/packages
- API dependencies
- Third-party library usage
```

## What Should NOT Be Included

❌ **Avoid These**:
- Implementation details of external libraries
- Obvious or self-explanatory code comments
- Personal opinions or preferences
- Outdated or deprecated code documentation
- Excessive low-level implementation details that don't aid understanding
- Duplicate information already in code comments

## Context.md Template

```markdown
# [Folder Name] - Technical Context

## Overview
Brief technical summary of what this folder implements.

## Core Functions

### `functionName(params): ReturnType`
**Purpose**: 
**Implementation**: 
**Usage**: 
**Dependencies**: 
**Side Effects**: 

## Types & Interfaces

### `TypeName`
**Purpose**: 
**Properties**: 
**Usage Context**: 
**Validation Rules**: 

## Classes/Components

### `ClassName`
**Purpose**: 
**Key Methods**: 
**State Management**: 
**Lifecycle**: 
**Usage Pattern**: 

## Constants & Configuration

### `CONSTANT_NAME`
**Value**: 
**Purpose**: 
**Usage**: 
**Modification Guidelines**: 

## Internal Architecture

### File Structure
- `file1.ts` - Brief description
- `file2.ts` - Brief description

### Data Flow
Explanation of how data moves through the components.

### Key Patterns
Important design patterns or conventions used.

## Dependencies

### Internal
- Dependencies on other project folders
- Key internal imports and relationships

### External
- Third-party packages and their purpose
- API endpoints or external services

## Usage Examples

### Basic Usage
```typescript
// Simple example of how to use main functionality
```

### Advanced Usage
```typescript
// More complex example showing advanced features
```

## Error Handling
How errors are handled and what exceptions might be thrown.

## Performance Considerations
Any performance implications or optimization notes.

## Testing Strategy
How this code should be tested and any existing test patterns.

## Future Considerations
Technical debt, potential refactors, or scalability concerns.
```

## Creation Guidelines

### 1. **Start with the Big Picture** 🎯
- Read all files in the folder first
- Understand the overall architecture
- Identify the main entry points and data flows

### 2. **Document Systematically** 📚
- Go through each file methodically
- Document public interfaces first, then implementation details
- Follow the template structure consistently

### 3. **Focus on Clarity** 💡
- Write for someone who needs to understand and modify the code
- Explain complex logic or non-obvious design decisions
- Use examples for complicated usage patterns

### 4. **Keep It Current** 🔄
- Update context files when code changes
- Remove documentation for deleted code
- Add documentation for new functionality

### 5. **Link Related Concepts** 🔗
- Cross-reference related functions and types
- Explain how components work together
- Document dependencies clearly

## Quality Checklist

Before finalizing a Context.md file, verify:

✅ **Completeness**
- All public functions are documented
- All types and interfaces are explained
- Dependencies are clearly identified
- Usage patterns are provided

✅ **Accuracy**
- Documentation matches current implementation
- Examples actually work
- Parameter types and return types are correct

✅ **Clarity**
- Technical language is precise but understandable
- Complex concepts are broken down
- Examples illustrate real usage

✅ **Relevance**
- Only necessary technical details are included
- Information helps with understanding and usage
- Outdated information is removed

## Maintenance Rules

### When to Update Context.md
- **Always** when adding new functions, types, or classes
- **Always** when changing function signatures or interfaces
- **Always** when modifying core logic that affects usage
- **Regularly** to remove outdated information

### How to Update
- Make incremental updates as you code
- Review and refresh periodically
- Keep the structure consistent with the template
- Test examples to ensure they still work

## Examples of Good Context Documentation

### Function Documentation
```markdown
### `validateUserInput(input: UserInput, rules: ValidationRules): ValidationResult`
**Purpose**: Validates user input against a set of business rules
**Implementation**: Uses a rule engine that applies validators in sequence, short-circuiting on first failure
**Usage**: Call before processing any user-submitted data
**Dependencies**: Requires `ValidationRuleEngine` and `ErrorFormatter`
**Side Effects**: Logs validation failures to audit system
```

### Type Documentation
```markdown
### `ApiResponse<T>`
**Purpose**: Standardized wrapper for all API responses
**Properties**: 
- `data: T | null` - The actual response data, null on error
- `success: boolean` - Whether the request succeeded
- `error?: string` - Error message if success is false
- `metadata: ResponseMetadata` - Pagination, timing info, etc.
**Usage Context**: All API endpoints return this type
**Validation Rules**: Must have either data or error, never both
```

## Remember

Context.md files are **living technical documentation**. They should make it easy for any AI (or human) contributor to quickly understand how to work with the code in a folder. Keep them accurate, complete, and focused on what matters for implementation and usage.

---

*This guide ensures consistent, high-quality technical documentation across all project folders.* 