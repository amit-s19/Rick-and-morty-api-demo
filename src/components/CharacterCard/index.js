import React from 'react';
import styles from './index.module.scss';
import { motion } from 'framer-motion';

const CharacterCard = (props) => {
    const { characterData, setCharacter, showModal } = props;

    // Animation stuff again
    const cardVariants = {
        initial: {
            y: -60,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                mass: 0.7,
                duration: 0.5,
                delay: characterData.id % 20 * 0.2
            }
        }
    }

    return (
        <motion.div
            className={styles.containerCard}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            onClick={() => { setCharacter(characterData); showModal(true) }}
        >
            <img src={characterData.image} />
            <div className={styles.detailsOverlay}>
                <p>{characterData.name}</p>
                <span>{characterData.species} • {characterData.gender} • {characterData.status}</span>
                <p>Read More</p>
            </div>
            <div className={styles.briefInfo}>
                <p>{characterData.name}</p>
                <p>{characterData.species} • {characterData.gender} • {characterData.status}</p>
                <p>Origin</p>
                <p>{characterData?.origin?.name}</p>
                <p>Location</p>
                <p>{characterData?.location?.name}</p>
            </div>
        </motion.div>
    )
}

export default CharacterCard;