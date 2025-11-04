export default function ({onSelectSquare,board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((PlayerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={PlayerSymbol!=null}>
                                    {PlayerSymbol}
                                </button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    );
}