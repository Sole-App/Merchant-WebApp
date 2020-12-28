function show(props) {
  try {
    props.onLoading(true);
  } catch {}
}

function hide(props) {
  try {
    props.onLoading(false);
  } catch {}
}

function loading(props, show) {
  try {
    props.onLoading(show);
  } catch {}
}

export default {
  loading,
  hide,
  show,
};