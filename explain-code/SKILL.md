---
name: explain-code
description: Use when a user wants to understand code or a pull request, learn how data moves between functions or files, understand why important lines exist, trace an error back to its cause, or practise reviewing code instead of receiving only a summary, verdict, or generated fix.
---

# Explain Code

## Purpose

Teach the user how the code works so they can read and review similar code themselves later.

Do not merely describe syntax or give a final verdict. Build understanding from the code's purpose through its complete data flow.

Write for a smart person who may not know the language, framework, or architecture yet. Use simple technical English. Keep the explanation brief, but do not skip the reason behind important code.

The user should finish able to explain:

1. What the code is trying to do.
2. Where the work starts.
3. How the data changes from step to step.
4. Why each important function and line exists.
5. What could fail or behave unexpectedly.
6. What they should check when reviewing similar code.

## Core Principles

### Teach, do not dump

Organize the explanation around one real execution path. Do not dump every file, symbol, log line, or possible concern onto the reader.

### Read the surrounding code first

Do not explain a function in isolation when its callers, dependencies, types, tests, or configuration change its meaning.

Inspect only the surrounding code needed to confirm the flow:

- The requested file, function, or PR diff
- The function that calls it
- The important functions it calls
- Input and output types
- Validation and permission checks
- Database or external-service calls
- Relevant tests

Do not guess when the code can be inspected. If something remains uncertain, label it as uncertain.

### Follow execution order

Explain the order the program runs, not the order files happen to appear in the repository.

Start at the entry point, such as:

- An HTTP request
- A button click
- A command
- A scheduled job
- A queue message
- A test
- A public function call

Then follow the data until the program returns a result, saves something, sends a message, or fails.

### Use one concrete example

Choose small, realistic sample data and carry the same example through the entire explanation.

For example:

```json
{
  "customerId": "customer-123",
  "items": [
    {
      "name": "Notebook",
      "price": 12
    }
  ]
}
```

Do not switch to unrelated example values halfway through the flow.

### Make "why" a required part

For every important function, block, or line, explain:

- What it does
- Why it exists
- What data it receives
- What data it returns or changes
- What could happen if it were missing or incorrect

Do not invent an original design reason that the code does not prove. When the exact reason is unknown, explain the practical job the code performs.

## Explanation Workflow

### Step 1: State the purpose

Begin with two or three short sentences:

- What user or business problem does this code solve?
- What starts the flow?
- What result does it produce?

**Avoid:**

> This module orchestrates validation, persistence, and response serialization through several architectural layers.

**Use:**

> This code receives an order request, checks it, calculates the total, saves the order, and returns a smaller response to the caller.

### Step 2: Show the full flow

Give a short numbered sequence before explaining individual lines.

Example:

1. The API receives the request.
2. `validateOrder` checks the submitted data.
3. `placeOrder` calculates the total.
4. `orderRepository.create` saves the order.
5. `toOrderResponse` chooses the fields returned to the caller.

Keep this map short. Its purpose is to give the reader a route they can hold in their head.

### Step 3: Trace one example through the flow

At each step, show the data before and after the function runs.

Use this compact shape:

```text
Step: validateOrder
Receives: { customerId: "customer-123", items: [...] }
Does: Checks that the customer and items exist.
Returns: { customerId: "customer-123", items: [...] }
Why: Stops incomplete orders before anything is saved.
```

When the data does not change, say so. A validation function may return the same values after proving they are acceptable.

Include important alternate paths, such as invalid input, a missing record, or a failed external request. Do not list every theoretical edge case.

### Step 4: Explain each function's purpose

For each function in the main path, cover the relevant fields below:

```text
Function: placeOrder
Purpose: Creates the values needed to save an order.
Called by: createOrder
Receives: The checked customer ID and item list.
Returns: The saved order.
Changes outside itself: Writes a new record to the database.
Why it is separate: Keeps order rules out of the HTTP controller.
```

Use only fields that add useful information. Do not repeat the same description under several headings.

### Step 5: Walk through meaningful lines

Explain every meaningful line in the requested code or changed PR path.

Use this pattern:

```text
Lines 12–13: const total = calculateTotal(input.items);

What: Adds the item prices and stores the result in `total`.
Why: The saved order needs a trusted total calculated by the server.
Data change: `items` stays the same; `total` is added.
Watch for: Empty items, invalid prices, and rounding money correctly.
```

Group lines that perform one small action together.

Usually group or briefly mention:

- Imports
- Type declarations
- Closing braces
- Framework setup
- Repeated boilerplate

Explain those lines in detail only when they affect behavior or the user explicitly asks for every literal line.

Do not say only what the syntax already says.

**Weak:**

> This line calls `saveOrder`.

**Useful:**

> This line sends the checked order to `saveOrder`. Saving happens only after validation, which prevents incomplete orders from reaching the database.

### Step 6: Explain the architecture

Describe how the important parts fit together in plain English.

Cover only the parts present in the actual flow:

- **Entry point:** What receives the request or event?
- **Coordinator:** What decides which steps run?
- **Rules:** Where are validation and business decisions made?
- **Storage:** What reads or writes saved data?
- **External systems:** What network calls, queues, files, or third-party services are used?
- **Output:** What creates the final response or visible result?

Put the plain meaning before an architecture term.

Example:

> `createOrder` coordinates the request. In this framework it is called a controller. It should handle the HTTP details while the service handles the order rules.

Do not name a design pattern unless naming it helps the user understand the code.

### Step 7: Teach the review method

After the walkthrough, show the user what to examine as a reviewer.

Check only areas relevant to the code:

- Does the code produce the intended behavior?
- What assumptions does it make about the input?
- Is invalid input rejected clearly?
- What happens when a record does not exist?
- Are permissions checked before private data is read or changed?
- Does it change the database, filesystem, cache, or another service?
- Could two requests interfere with each other?
- Could the change break existing callers or saved data?
- Do the tests prove the main behavior and important failure paths?
- Is the code more complicated than the problem requires?

Separate understanding from review findings:

```text
What the code does: Lowercases the email before saving it.

Review question: Is lowercasing the email an agreed product rule, and is it tested?
```

Do not invent a defect merely to provide review feedback. Tie each concern to code or missing evidence.

### Step 8: End with a reusable lesson

Finish with:

1. A short explanation the user could repeat to someone else.
2. One general lesson they can use when reading similar code.
3. Up to two optional teach-back questions.

Example:

```text
In your own words: This request is checked, converted into an order, saved, and then reduced to a safe API response.

Reusable lesson: When reading request code, follow one value from the request to validation, business rules, storage, and the response.

Check your understanding:
1. Why is the total calculated on the server instead of accepted from the request?
2. What stops an order with no items from being saved?
```

Give the requested explanation before asking questions. Do not turn the response into an exam.

If the user answers, correct misunderstandings gently and point back to the relevant code.

## Modes

### Single function

Keep the response small:

1. Purpose
2. Example input
3. Line-by-line data changes
4. Result
5. One important review lesson

Do not add a large architecture section when the function has no larger context available.

### Multi-file feature

Explain:

1. Entry point
2. End-to-end flow
3. Concrete data example
4. Function responsibilities
5. Important lines
6. Architecture
7. Failure paths and tests

### Pull request

Read both the diff and enough surrounding code to understand the change.

Explain:

1. Behavior before the PR
2. Behavior after the PR
3. Changed data flow
4. Why each important changed line exists
5. Review findings supported by evidence
6. Tests that exist and tests that appear missing

Focus the line-by-line walkthrough on changed lines and the nearby code required to understand them. Do not explain unrelated unchanged files.

### Error or failing test

Do not stop at the line where the error appears.

Trace backward:

1. What value was wrong at the failing line?
2. Which function supplied that value?
3. Where should the value have been checked or created?
4. Why did the current checks allow the failure?
5. What test would reproduce the cause?

Example:

> The error appears on `user.email`, but that line is not the full cause. `findUser` returned no user, and the caller used the result without checking it. The missing-record check belongs before the email is read.

### Newly written code

When explaining code that was just created or changed, do not only describe the final version.

Explain:

- What behavior was added or changed
- How one example moves through it
- Why the main functions are separated
- Which assumptions and risks deserve review
- Which tests prove the behavior

Do not make additional code changes unless the user asks.

## Plain-Language Rules

Use short sentences and common words.

Prefer:

- "Saves the data" instead of "persists the entity"
- "Calls the service" instead of "invokes the service layer"
- "Creates the response" instead of "serializes the representation"
- "Checks the input" instead of "performs input validation"
- "Another package includes it" instead of "it is transitive"
- "Changes data outside the function" before "side effect"
- "The code can run in either order" before "race condition"

Define necessary technical terms once, then use them normally.

Avoid:

- Decorative boxes
- Wide tables
- "Insight" callouts
- Long introductions
- Dramatic wording
- Unexplained abbreviations
- Repeating the same fact
- Describing obvious punctuation or braces
- Generic praise such as "clean" or "robust" without evidence

Use a small code excerpt when it helps connect the explanation to the exact line. Do not paste the whole file repeatedly.

## Complete Example

Given:

```ts
function applyDiscount(price: number, percentage?: number): number {
  const safePercentage = Math.min(
    Math.max(percentage ?? 0, 0),
    100
  );

  const discount = price * (safePercentage / 100);

  return Math.round((price - discount) * 100) / 100;
}
```

Explain it like this:

```text
What it does

`applyDiscount` reduces a price by a percentage. It prevents percentages below 0 or above 100 and rounds the final price to two decimal places.

Example

Input: price = 80, percentage = 25
Output: 60

Line by line

1. `function applyDiscount(...)`
   - Receives a price and an optional percentage.
   - Returns the final price as a number.

2. `percentage ?? 0`
   - Uses 0 when no percentage was provided.
   - Why: A missing discount should leave the price unchanged.
   - Data: 25 stays 25.

3. `Math.max(..., 0)` and `Math.min(..., 100)`
   - Limits the percentage to the range 0 through 100.
   - Why: A negative discount would increase the price, and a value above 100 would make it negative.
   - Data: 25 stays 25. A value of 140 would become 100.

4. `price * (safePercentage / 100)`
   - Converts 25 into 0.25 and multiplies it by 80.
   - Data: discount = 20.

5. `price - discount`
   - Subtracts 20 from 80.
   - Data: final price before rounding = 60.

6. `Math.round(... * 100) / 100`
   - Rounds the result to two decimal places.
   - Why: Prices should not contain long decimal values caused by computer arithmetic.

Flow

80 and 25 → safe percentage 25 → discount 20 → final price 60

Review lesson

When reviewing money calculations, check the allowed input range and the rounding rule. Also look for tests covering a missing percentage, a negative percentage, a value above 100, and decimal prices.

Check your understanding

Why does the function limit the percentage before calculating the discount?
```

## Common Failure Patterns

### Syntax restatement

**Problem:** "This `if` statement checks a condition."

**Fix:** Explain which condition, why it matters, and what changes on each path.

### File-by-file dump

**Problem:** Explaining every file separately without showing how they connect.

**Fix:** Follow one example through the runtime order.

### Isolated error line

**Problem:** Explaining only the line that threw the error.

**Fix:** Trace the bad value backward to where it was created or should have been checked.

### Review verdict without teaching

**Problem:** Listing defects without first explaining the intended behavior.

**Fix:** Explain the flow, then show why each finding could break that flow.

### Too much detail too early

**Problem:** Starting with every helper, type, and edge case.

**Fix:** Give the map first, then the main path, then important details.

### Unsupported design claims

**Problem:** Claiming why the original author made a choice without evidence.

**Fix:** Explain the code's practical purpose and label any historical reason as unknown.

## Final Check

Before responding, verify:

- Did I inspect enough surrounding code to confirm the flow?
- Did I start with the code's purpose?
- Did I identify the real entry point?
- Did I trace one concrete example end to end?
- Did I show how the data changes between functions?
- Did I explain why each important function and line exists?
- Did I connect the failing line to its earlier cause when discussing an error?
- Did I explain how the main parts fit together?
- Did I teach relevant code-review questions?
- Did I distinguish confirmed behavior from inference?
- Did I keep the wording simple and the response focused?
- Did I avoid repeating the same fact?
- Could the user now explain the main flow themselves?

Revise the response when any answer is no.

## Final Rule

Do not help the user memorize code.

Help them follow the data, understand the reasons, and recognize the same pattern next time.
