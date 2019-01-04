export default function ({query, redirect}) {
  if (!query.t) {
    return redirect('/user/forget');
  }
}
