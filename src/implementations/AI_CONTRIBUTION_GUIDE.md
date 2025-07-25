# AI Contribution Guide 🤖

## Project Philosophy: Vibe-Coded Development

This project embraces **vibe-coded development** - a philosophy that prioritizes:
- Intuitive, flowing code that feels natural to read and write
- Quick iteration and organic growth over rigid planning
- Code that captures the essence and energy of ideas
- Collaborative human-AI partnership in creation

## Core Rules for AI Contributors

### 1. The Vibe First Principle ✨
- **Feel the flow**: Write code that has natural rhythm and intuitive structure
- **Embrace organic growth**: Let solutions evolve naturally rather than forcing rigid architectures
- **Trust the process**: Sometimes the best code comes from following instincts rather than strict patterns

### 2. Documentation as Living Context 📝
- **Every folder MUST have an AI.md file** explaining its purpose and contents
- **Most folders SHOULD have a Context.md file** documenting technical implementation details
- AI.md captures the "why" and "vibe" - Context.md captures the "what" and "how"
- Keep docs conversational and accessible - write like you're explaining to a collaborator
- See `CONTEXT_MD_GUIDE.md` for detailed technical documentation standards

### 3. Code Creation Guidelines 🛠️

#### Style & Structure
- **Readable over clever**: Choose clarity over showing off
- **Consistent but not rigid**: Follow patterns that emerge naturally
- **Name things meaningfully**: Variables and functions should tell their story
- **Comment the why, not the what**: Explain reasoning and context

#### Architecture Principles
- **Start simple, evolve complexity**: Begin with the most straightforward solution
- **Favor composition over inheritance**: Build with smaller, combinable pieces
- **Design for change**: Code should be easy to modify and extend
- **Keep dependencies minimal**: Only add what adds real value

#### Implementation Approach
- **Prototype first**: Get something working, then refine
- **Test the happy path**: Ensure core functionality works before edge cases
- **Iterate in small steps**: Make frequent, small improvements
- **Listen to the code**: If it's getting messy, step back and refactor

### 4. Collaboration Standards 🤝

#### AI-Human Partnership
- **Ask clarifying questions** when requirements are ambiguous
- **Suggest alternatives** when you see potential improvements
- **Explain your reasoning** behind architectural decisions
- **Be honest about limitations** and trade-offs

#### Code Handoff
- **Leave breadcrumbs**: Make it easy for the next person (AI or human) to continue
- **Document decisions**: Capture important choices and their rationale
- **Clean up after yourself**: Remove debug code, organize imports, etc.
- **Test your changes**: Ensure nothing breaks before committing

### 5. Folder Organization 📁

#### Required Files
- `AI.md` - Explains the folder's purpose, contents, and current state
- `Context.md` - Documents technical implementation details (for folders with code)
- Implementation files following the established patterns
- Tests (when appropriate for the component)

#### AI.md Template
```markdown
# [Folder Name] - AI Documentation

## Purpose
Brief description of what this folder contains and why it exists.

## Current State
What's implemented, what's working, what's not.

## Contents
- File descriptions
- Key components or functions
- Important relationships or dependencies

## Vibe Check
How does this fit into the overall project vision?

## Next Steps
What would naturally come next in development?

## Notes for Future AI
Any context, decisions, or gotchas that would help the next AI contributor.
```

## Development Workflows

### Starting New Features
1. **Understand the vibe** - What feeling should this feature create?
2. **Sketch the basics** - What's the minimal viable implementation?
3. **Create the structure** - Set up folders and AI.md files
4. **Implement incrementally** - Build in small, testable pieces
5. **Refine and polish** - Improve based on usage and feedback

### Maintaining Existing Code
1. **Read the AI.md files** - Understand the context and decisions
2. **Feel the existing patterns** - Follow the established vibe
3. **Make surgical changes** - Minimize disruption to working code
4. **Update documentation** - Keep AI.md files current
5. **Test thoroughly** - Ensure changes don't break the flow

## Quality Standards

### Code Quality
- **It should feel good to read** - Code should flow naturally
- **It should be easy to modify** - Changes shouldn't require major rewrites
- **It should tell its story** - Purpose should be clear from structure
- **It should handle errors gracefully** - Fail in understandable ways

### Performance
- **Good enough is perfect** - Don't over-optimize prematurely
- **Measure what matters** - Focus on user-perceivable performance
- **Simple solutions first** - Complex optimizations only when needed

## Anti-Patterns to Avoid

- **Over-engineering**: Don't build for problems you don't have
- **Premature abstraction**: Wait until you have 2-3 examples before generalizing
- **Cargo cult coding**: Don't copy patterns without understanding them
- **Analysis paralysis**: Better to start and iterate than plan forever
- **Breaking the vibe**: Don't introduce jarring inconsistencies

## Remember

This is a **vibe-coded** project. Trust your instincts, write code that feels good, and don't be afraid to iterate. The goal is to create something that works well and feels natural to use and maintain.

When in doubt, ask yourself: "Does this feel right?" If the answer is no, try a different approach.

---

*This guide is living documentation - update it as the project evolves and patterns emerge.* 