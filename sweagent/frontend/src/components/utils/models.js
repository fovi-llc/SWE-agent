const llmModels = {
  gpt3: {
    name: 'GPT-4',
    description: 'Developed by OpenAI, it is one of the most powerful LLMs, offering impressive text generation.',
  },
  bert: {
    name: 'BERT',
    description: 'Created by Google, BERT excels in understanding the context of words in search queries.',
  },
  roberta: {
    name: 'RoBERTa',
    description: 'Built on BERT’s architecture, RoBERTa is optimized for more robust performance on NLP tasks.',
  },
  t5: {
    name: 'T5',
    description: 'The Text-to-Text Transfer Transformer (T5) treats every NLP task as a text-to-text problem.',
  },
  gptNeo: {
    name: 'GPT-Neo',
    description: 'An open-source alternative to GPT-3 that aims to scale up to and beyond the capabilities of GPT-3.',
  },
  gptJ: {
    name: 'GPT-J',
    description: 'An open-source large language model similar to GPT-3 with a focus on accessibility and extensibility.',
  },
  distilBERT: {
    name: 'DistilBERT',
    description: 'A smaller, faster, cheaper, and lighter version of BERT that retains most of its performance.',
  },
  gptNeoX: {
    name: 'GPT-NeoX',
    description: 'An even larger and more powerful model in the GPT-Neo series.',
  },
  jurassic1: {
    name: 'Jurassic-1',
    description: 'Developed by AI21 Labs, it is designed to provide a different approach to LLMs.',
  },
  ernie: {
    name: 'ERNIE',
    description: 'This Baidu creation enhances language understanding by training on extensive data.',
  },
};

export default llmModels;