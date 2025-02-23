import css from './Description.module.css';

const Description = () => {
  return (
    <div>
        <h1 className={css.title}>Меню</h1>
        <p className={css.text}>У нашому меню представлені страви на будь-який смак. Ми готуємо тільки зі свіжих продуктів, тому наші страви завжди смачні та корисні. Приходьте до нас і переконайтеся самі!</p>
    </div>
  )
}

export default Description