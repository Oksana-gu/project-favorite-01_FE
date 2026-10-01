import css from "./AdvantagesBlock.module.css";

export default function AdvantagesBlock() {
  return (
    <section className={css.advantages}>
      <div className={css.container}>
        <h2 className={css.advantagesTitle}>Ключові переваги</h2>
        <ul className={css.advantagesList}>
          <li className={css.advantagesItem}>
            <svg className={css.advantagesItemIcon}>
              <use
                className={css.advantagesItemIconUse}
                href="/sprite.svg#check_box"
              />
            </svg>
            <h3 className={css.advantagesItemTitle}>Реальні відгуки</h3>
            <p className={css.advantagesItemDescription}>
              Користувачі діляться чесними враженнями, щоб ви робили правильний
              вибір.
            </p>
          </li>
          <li className={css.advantagesItem}>
            <svg className={css.advantagesItemIcon}>
              <use
                className={css.advantagesItemIconUse}
                href="/sprite.svg#filter"
              />
            </svg>
            <h3 className={css.advantagesItemTitle}>Зручні фільтри</h3>
            <p className={css.advantagesItemDescription}>
              Шукайте за типом локації, регіоном, наявністю зручностей та іншими
              критеріями.
            </p>
          </li>
          <li className={`${css.advantagesItem} ${css.advantagesItemLast}`}>
            <svg className={css.advantagesItemIcon}>
              <use
                className={css.advantagesItemIconUse}
                href="/sprite.svg#communication"
              />
            </svg>
            <h3 className={css.advantagesItemTitle}>Спільнота мандрівників</h3>
            <p className={css.advantagesItemDescription}>
              Додавайте власні улюблені місця та діліться своїми неймовірними
              знахідками.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}