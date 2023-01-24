import Preference from 'src/components/Preference/Preference'

export const QUERY = gql`
  query FindPreferenceById($cuid: String!) {
    preference: preference(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      entity
      value
      userCuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Preference not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ preference }) => {
  return <Preference preference={preference} />
}
