import chapter1 from './chapter1'
import chapter2 from './chapter2'
import chapter3 from './chapter3'
import chapter4 from './chapter4'
import chapter5 from './chapter5'

const chapters = { 1: chapter1, 2: chapter2, 3: chapter3, 4: chapter4, 5: chapter5 }

export function getChapter(num) {
  return chapters[num] || null
}

export function getAllChapters() {
  return chapters
}
