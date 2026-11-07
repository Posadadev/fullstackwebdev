function CharacterCard({ character }) {
  return (
    <article className="character-card">
      <img src={character.image} alt={character.name} />

      <div className="card-content">
        <h3>{character.name}</h3>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
      </div>
    </article>
  );
}

export default CharacterCard;
