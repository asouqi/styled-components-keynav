import styled from 'styled-components'
import {withKeyboardNav} from "../../../src/withKeyboardNav";
import {useState} from "react";

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: #ccc;
  padding: 2px;
  max-width: 400px;
`

const Row = styled.div`
  display: contents;
`

const Cell = styled.div`
  padding: 16px;
  background: white;
  text-align: center;
  cursor: pointer;
  
  &[data-active="true"] {
    background: #e3f2fd;
    outline: 2px solid #1976d2;
    outline-offset: -2px;
  }
  
  &:hover {
    background: #f5f5f5;
  }
`

const KeyboardGrid = withKeyboardNav(Table, {
    pattern: 'grid',
    rows: 3,
    columns: 4,
    loop: false,
})

export function Calendar() {
    const handleActivate = (row: number, col: number) => {
        console.log(`Selected cell: row ${row}, column ${col}`)
    }

    return (
        <KeyboardGrid onActivate={handleActivate}>
            <Row>
                <Cell>1</Cell>
                <Cell>2</Cell>
                <Cell>3</Cell>
                <Cell>4</Cell>
            </Row>
            <Row>
                <Cell>5</Cell>
                <Cell>6</Cell>
                <Cell>7</Cell>
                <Cell>8</Cell>
            </Row>
            <Row>
                <Cell>9</Cell>
                <Cell>10</Cell>
                <Cell>11</Cell>
                <Cell>12</Cell>
            </Row>
        </KeyboardGrid>
    )
}

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  gap: 8px;
`

const GRow = styled.div`
  display: contents;
`

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  
  &[data-active="true"] {
    outline: 3px solid #1976d2;
    outline-offset: 2px;
  }
  
  &:hover {
    opacity: 0.9;
  }
`

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  
  &:hover {
    background: #eee;
  }
`

const KeyboardGallery = withKeyboardNav(Gallery, {
    pattern: 'grid',
    rows: 2,
    columns: 3,
    loop: true,
})

// Sample images from picsum.photos
const images = [
    { src: 'https://picsum.photos/seed/cat1/400/400', alt: 'Random image 1' },
    { src: 'https://picsum.photos/seed/dog2/400/400', alt: 'Random image 2' },
    { src: 'https://picsum.photos/seed/bird3/400/400', alt: 'Random image 3' },
    { src: 'https://picsum.photos/seed/fish4/400/400', alt: 'Random image 4' },
    { src: 'https://picsum.photos/seed/tree5/400/400', alt: 'Random image 5' },
    { src: 'https://picsum.photos/seed/lake6/400/400', alt: 'Random image 6' },
]

export function ImageGallery() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
    }

    const closeLightbox = () => {
        setLightboxIndex(null)
    }

    const handleActivate = (row: number, col: number) => {
        const index = row * 3 + col
        openLightbox(index)
    }

    // Handle keyboard in lightbox
    const handleLightboxKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeLightbox()
        } else if (e.key === 'ArrowRight' && lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % images.length)
        } else if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
        }
    }

    return (
        <>
            <KeyboardGallery onActivate={handleActivate}>
                <GRow>
                    <Thumbnail src={images[0].src} alt={images[0].alt} />
                    <Thumbnail src={images[1].src} alt={images[1].alt} />
                    <Thumbnail src={images[2].src} alt={images[2].alt} />
                </GRow>
                <GRow>
                    <Thumbnail src={images[3].src} alt={images[3].alt} />
                    <Thumbnail src={images[4].src} alt={images[4].alt} />
                    <Thumbnail src={images[5].src} alt={images[5].alt} />
                </GRow>
            </KeyboardGallery>

            {lightboxIndex !== null && (
                <LightboxOverlay
                    onClick={closeLightbox}
                    onKeyDown={handleLightboxKeyDown}
                    tabIndex={0}
                    role="dialog"
                    aria-label="Image lightbox"
                >
                    <CloseButton onClick={closeLightbox} aria-label="Close">
                        ×
                    </CloseButton>
                    <LightboxImage
                        src={images[lightboxIndex].src}
                        alt={images[lightboxIndex].alt}
                        onClick={(e) => e.stopPropagation()}
                    />
                </LightboxOverlay>
            )}
        </>
    )
}
