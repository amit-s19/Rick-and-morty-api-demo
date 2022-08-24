import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { AnimatePresence, motion } from 'framer-motion'
import useOutsideAlerter from '../../helper/useOutsideAlerter';
import alive from '../../assets/alive.png';
import dead from '../../assets/dead.png';
import unknown from '../../assets/unknown.png';
import { getResidentsCount, getEpisodeNames } from '../../api';

// Animation stuff
const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const modalVariant = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            mass: 0.6,
            duration: 0.5,
            delay: 0.2
        }
    }
}

const DetailsModal = (props) => {
    const { modal, showModal, character } = props;
    const [originResidents, setOriginResidents] = useState(null)
    const [locationResidents, setLocationResidents] = useState(null)
    const [episodesData, setEpisodesData] = useState(null)
    const divRef = useRef();

    // A custom hook to check if the user clicked anywhere outside the modal.
    useOutsideAlerter(divRef, showModal);

    const getStatusImage = () => {
        return character.status == 'Alive' ? alive : character.status == 'Dead' ? dead : unknown;
    }

    // Setting up the required data like residents count and episodes data for the selected character.
    useEffect(() => {
        async function setRequiredData() {
            if (character?.location?.url) {
                let lrc = await getResidentsCount(character.location.url);
                setLocationResidents(lrc);
            }
            if (character?.location?.url) {
                let orc = await getResidentsCount(character.origin.url);
                setOriginResidents(orc)
            }
            let episodeArray = [];
            character.episode.forEach(el => episodeArray.push(el.slice(el.lastIndexOf("/") + 1)))
            let episodeData = await getEpisodeNames(episodeArray);
            setEpisodesData(episodeData);
        }
        setRequiredData();
    }, [character])

    return (
        <AnimatePresence >
            {modal &&
                <motion.div
                    className={styles.backdrop}
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div className={styles.container}
                        variants={modalVariant}
                        ref={divRef}
                    >
                        <div className={styles.mainData}>
                            <img src={character.image} />
                            <div className={styles.mainText}>
                                <p>{character.name}</p>
                                <p> {character.species} • {character.gender} • {character.status} &nbsp;<img src={getStatusImage()} /></p>
                                <p>Origin</p>
                                <p>{character?.origin?.name} {originResidents && `- ${originResidents} Residents`}</p>
                                <p>Location</p>
                                <p>{character?.location?.name} {locationResidents && `- ${locationResidents} Residents`}</p>
                            </div>
                        </div>
                        <div className={styles.separator}></div>
                        <p className={styles.featuredText}>Featured In </p>
                        <div className={styles.episodeData}>
                            {episodesData?.length > 1 ? episodesData?.map(ep => <p key={ep.id}>{ep.episode} - {ep.name} aired on {ep.air_date}</p>) : <p key={episodesData?.id}>{episodesData?.episode} - {episodesData?.name} aired on {episodesData?.air_date}</p>}
                        </div>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default DetailsModal;