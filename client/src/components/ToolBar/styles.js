import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      top: '50%',
      left: '20px',
      transform: 'translateY(-50%);',
      display: 'flex',
      flexDirection: 'column',
      
    },
    group: {
      boxShadow: '12px 0px 25px 4px rgba(34, 60, 80, 0.05)',
      marginBottom:'5px'
    }
  }));

  export default useStyles