"use client";
import CodeHighlighter from "@/components/CodeHighlighter";
import { useState, useEffect } from "react";
import styles from "./styles.module.css"

interface BitViewerProps {
  value: number;
  highlightedBit?: number;
  bits?: number;
}

const BitViewer = ({ value, highlightedBit, bits = 8 }: BitViewerProps) => {
  const bitArray = Array.from({ length: bits }, (_, i) => (value >> i) & 1);
  const [animatedBit, setAnimatedBit] = useState<number | undefined>(undefined);

  // Запускаем анимацию при изменении highlightedBit
  useEffect(() => {
    if (highlightedBit !== undefined) {
      setAnimatedBit(highlightedBit);
      const timer = setTimeout(() => setAnimatedBit(undefined), 1500); // Сбрасываем анимацию через 1.5 секунды
      return () => clearTimeout(timer);
    }
  }, [highlightedBit]);

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {bitArray.map((bit, index) => (
        <div
          key={index}
          className={animatedBit === index ? "highlight" : ""}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            backgroundColor: highlightedBit === index ? "#ffcc00" : "#f0f0f0",
            transition: "background-color 0.3s ease",
          }}
        >
          {bit}
        </div>
      ))}
    </div>
  );
};



// Константы для битовых масок
const READ = 0b0001;
const UPDATE = 0b0010;
const CREATE = 0b0100;
const DELETE = 0b1000;
const BIT_MASK = 0b0010;
const WORD_LEN = 32;

const OWNER = READ | UPDATE | CREATE | DELETE; // 0b1111
const EDITOR = READ | UPDATE | CREATE; // 0b1011
const VIEWER = READ; // 0b0001

// Класс BitSet
class BitSet {
  private words: number[] = [0]; // Инициализация массива слов

  add(index: number) {
    const wordIndex = index >> 5; // Вычисление индекса слова
    this.ensureCapacity(wordIndex);
    this.words[wordIndex] |= 1 << index; // Установка бита в 1
  }

  remove(index: number) {
    const wordIndex = index >> 5;
    if (wordIndex < this.words.length) {
      this.words[wordIndex] &= ~(1 << index); // Установка бита в 0
    }
  }

  has(index: number): boolean {
    const wordIndex = index >> 5;
    return wordIndex < this.words.length && (this.words[wordIndex] & (1 << index)) !== 0;
  }

  private ensureCapacity(wordIndex: number) {
    while (this.words.length <= wordIndex) {
      this.words.push(0); // Добавление новых слов при необходимости
    }
  }
}

export default function BitSetGuide() {
  const [permissions, setPermissions] = useState(0b0000);
  const [input, setInput] = useState(0);
  const [highlightedBit, setHighlightedBit] = useState<number | undefined>(undefined);

  const addReadPermission = (permissions: number) => permissions | READ;
  const removeReadPermission = (permissions: number) => permissions & ~READ;

  return (
    <div>
      <h1>Bit Sets: Bit Manipulation</h1>

      <div>
        <h3>Permissions Example</h3>
        <BitViewer value={permissions} highlightedBit={highlightedBit} />
        <input
          type="number"
          value={permissions}
          onChange={(e) => setPermissions(parseInt(e.target.value, 2))}
        />
        <button
          onClick={() => {
            setPermissions(addReadPermission(permissions));
            setHighlightedBit(0); // Подсветим бит READ
          }}
        >
          Add READ Permission
        </button>
        <button
          onClick={() => {
            setPermissions(removeReadPermission(permissions));
            setHighlightedBit(0); // Подсветим бит READ
          }}
        >
          Remove READ Permission
        </button>
      </div>

      <div>
        <h3>BitSet Example</h3>
        <BitViewer value={input} highlightedBit={highlightedBit} />
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() => {
            setHighlightedBit(input); // Подсветим изменяемый бит
          }}
        >
          Highlight Bit
        </button>
      </div>
    </div>
  );
}