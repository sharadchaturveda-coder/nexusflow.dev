# `faqs` Constant

This file exports an array of frequently asked questions (FAQs) and their corresponding answers, used to populate the help page's accordion.

## Structure

The `faqs` array is an array of objects, where each object has:

*   `question` (string): The question text.
*   `answer` (string): The answer text.

## Usage

```typescript
import { faqs } from '@/constants/faqs';

{faqs.map((faq, index) => (
  <AccordionItem key={index} question={faq.question} answer={faq.answer} />
))}
