import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { getPaginatedCharacters } from '../../api/index';
import CharacterCard from '../CharacterCard';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import DetailsModal from '../DetailsModal';

// Animation stuff
const containerVariants = {
    initial: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
}

const LandingPage = () => {

    const [data, setData] = useState([]);
    const [character, setCharacter] = useState(null);
    const [modal, showModal] = useState(false);
    const page = useRef(1);
    const fetching = useRef(false);
    const hasMoreData = useRef(true);

    // To check if we are on a mobile screen
    let isMobile = window.innerWidth < 769;

    // Fetching the first fold of characters.
    useEffect(() => {
        async function fetchInitialCharacters() {
            fetching.current = true;
            let data = await getPaginatedCharacters(page.current);
            setData(data.results);
            page.current += 1;
            fetching.current = false;
        }
        if (!fetching.current) fetchInitialCharacters();
    }, [])

    // Fetching the next pages of characters on scroll.
    useEffect(() => {
        window.addEventListener('scroll', debounce(async () => {
            if (window.innerHeight + document.documentElement.scrollTop > (document.scrollingElement.scrollHeight - 100) && !fetching.current && hasMoreData.current) {
                fetching.current = true;
                let res = await getPaginatedCharacters(page.current);
                setData(prevData => [...prevData, ...res.results])
                page.current += 1;
                fetching.current = false;
            }
        }, 500));
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.heading}>Rick And Morty Api Cards</div>
            <p>{isMobile ? 'Tap ' : 'Click '}on any character card to read more about it</p>
            <motion.div
                className={styles.cardsContainer}
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {data.length > 0 && data.map(el =>
                    <CharacterCard
                        key={el.id}
                        characterData={el}
                        setCharacter={setCharacter}
                        showModal={showModal}
                    />)
                }
            </motion.div>
            <DetailsModal
                modal={modal}
                showModal={showModal}
                character={character}
            />
        </div>
    )
}

export default LandingPage;