import notificationDOM from './notification'
import './notificaty.css'

let notification
const notifications = [];

const getNoticeKey = () => {
    return `notice-${new Date().getTime()}-${notifications.length}`
}

const notice = noticeOptions => {
    const { type, content, duration = 2000, onClose } = noticeOptions;
    if (!notification) notification = notificationDOM
    const key = noticeOptions.key || getNoticeKey();
    const notificationsCache = {};
    notificationsCache[key] = notification;
    notifications.push(notificationsCache);
    return notification.addNotice({ type, content, duration, onClose, key })
}

export default {
    info(contentStr, noticeOptions = {}) {
        const { duration, onClose, content: _content, key } = noticeOptions
        const content = contentStr || _content;
        const options = {
            type: 'info',
            content,
            duration,
            onClose,
            key,
        }
        return notice(options)
    },
    success(contentStr, noticeOptions = {}) {
        const { duration, onClose, content: _content, key } = noticeOptions
        const content = contentStr || _content;
        const options = {
            type: 'success',
            content,
            duration,
            onClose,
            key,
        }
        return notice(options)
    },
    warning(contentStr, noticeOptions = {}) {
        const { duration, onClose, content: _content, key } = noticeOptions
        const content = contentStr || _content;
        const options = {
            type: 'warning',
            content,
            duration,
            onClose,
            key,
        }
        return notice(options)
    },
    error(contentStr, noticeOptions = {}) {
        const { duration, onClose, content: _content, key } = noticeOptions
        const content = contentStr || _content;
        const options = {
            type: 'error',
            content,
            duration,
            onClose,
            key,
        }
        return notice(options)
    },
    loading(contentStr, noticeOptions = {}) {
        const { onClose, content: _content, key } = noticeOptions
        const content = contentStr || _content;
        const options = {
            type: 'loading',
            content,
            duration: 0,
            onClose,
            key,
        }
        return notice(options)
    },
    close(key) {
        notifications.forEach(notificaty => {
            const closeKey = Object.keys(notificaty)[0];
            if (key === closeKey){
                notificaty[key].close(key);
            }
        })
    },
    destoryAll() {
        notifications.forEach(notificaty => {
            const key = Object.keys(notificaty)[0];
            notificaty[key].close(key);
        })
    }
}