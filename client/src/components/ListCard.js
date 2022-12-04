export default function ListCard({ playlist }) {
    return(
        <div>
            {playlist.name + ' and ' + playlist.ownerUsername}
        </div>
    )
}