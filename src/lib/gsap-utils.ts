/**
 * Simple SplitText utility since GSAP's premium SplitText is not available.
 * Splits text into individual character spans for animation.
 */
export function SplitText(element: HTMLElement, options: { type: 'chars' | 'words' | 'chars,words' } = { type: 'chars' }): { chars: HTMLElement[]; words: HTMLElement[] } {
  const text = element.textContent || '';
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];

  element.innerHTML = '';
  element.style.display = 'inline-block';

  if (options.type === 'words' || options.type === 'chars,words') {
    const wordList = text.split(/(\s+)/);
    wordList.forEach((word) => {
      if (word.match(/^\s+$/)) {
        // whitespace
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.display = 'inline';
        element.appendChild(space);
        return;
      }
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';

      if (options.type === 'chars,words') {
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform, opacity';
          wordSpan.appendChild(charSpan);
          chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = word;
        wordSpan.style.willChange = 'transform, opacity';
      }

      element.appendChild(wordSpan);
      words.push(wordSpan);
    });
  } else if (options.type === 'chars') {
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      element.appendChild(span);
      chars.push(span);
    });
  }

  return { chars, words };
}
